import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, AlertTriangle } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from 'recharts';

import PageWrapper from '../components/PageWrapper';
import DashboardLayout from '../layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

interface SkillMatch {
  skill: string;
  score: number;
}

interface ApiResponse {
  username: string;
  avatar_url: string;
  github_score: number;
  hire_recommendation: string;
  strengths: string[];
  weaknesses: string[];
  risk_flags: string[];
  final_verdict: string;
  skill_match: SkillMatch[];
}

const RecruiterResultPage = () => {

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const githubUrl = params.get("url") || "";
  const role = params.get("role") || "";
  const experience = params.get("experience") || "";
  const skills = params.get("skills") || "";

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (githubUrl) fetchData();
  }, [githubUrl]);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8000/analyze?url=${encodeURIComponent(githubUrl)}&role=${role}&experience=${experience}&skills=${skills}`
      );

      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <DashboardLayout>
          <p className="text-center">Analyzing GitHub profile...</p>
        </DashboardLayout>
      </PageWrapper>
    );
  }

  if (!data) {
    return (
      <PageWrapper>
        <DashboardLayout>
          <p className="text-center text-red-500">No data returned</p>
        </DashboardLayout>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <DashboardLayout>

        <div className="space-y-8">

          {/* PROFILE */}
          <Card className="glassmorphism">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{data.username}</CardTitle>
                  <CardDescription>
                    <a
                      href={`https://github.com/${data.username}`}
                      target="_blank"
                      className="text-primary"
                    >
                      @{data.username}
                    </a>
                  </CardDescription>
                </div>

                <div className="text-right">
                  <p className="text-sm">Overall Score</p>
                  <p className="text-5xl font-bold">{data.github_score}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex justify-between items-center border-t pt-4">
              <h3 className="font-semibold">Hire Recommendation</h3>
              <Badge>{data.hire_recommendation}</Badge>
            </CardContent>
          </Card>

          {/* GRID */}
          <div className="grid lg:grid-cols-2 gap-8">

            {/* SKILLS */}
            <Card>
              <CardHeader>
                <CardTitle>Skill Match</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.skill_match ?? []} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="skill" width={90} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="score" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* STRENGTHS & WEAKNESSES */}
            <div className="space-y-8">

              <Card>
                <CardHeader>
                  <CardTitle className="flex gap-2">
                    <ThumbsUp className="text-green-500" /> Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {(data.strengths ?? []).map((s, i) => (
                      <li key={`s-${i}`}>{s}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex gap-2">
                    <ThumbsDown className="text-yellow-500" /> Weaknesses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {(data.weaknesses ?? []).map((w, i) => (
                      <li key={`w-${i}`}>{w}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

            </div>

          </div>

          {/* VERDICT */}
          <Card>
            <CardHeader>
              <CardTitle className="flex gap-2">
                <AlertTriangle className="text-red-500" />
                Final Verdict
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="bg-secondary p-4 rounded-md text-sm">
                {data.final_verdict}
              </p>
            </CardContent>
          </Card>

        </div>

      </DashboardLayout>
    </PageWrapper>
  );
};

export default RecruiterResultPage;
