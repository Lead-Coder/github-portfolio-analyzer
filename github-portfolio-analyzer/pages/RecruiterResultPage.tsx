import React, { useState, useRef } from 'react';
import { ThumbsUp, AlertTriangle, Download, Star, TrendingUp, Code } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line
} from 'recharts';

import PageWrapper from '../components/PageWrapper';
import DashboardLayout from '../layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';


interface RepositoryAnalysis {
  username: string;
  repository: string;
  githubUrl: string;
  github_score: number;
  code_quality_score: number;
  code_organization: string;
  readme_quality: string;
  strengths: Array<{ id: string; text: string }>;
  red_flags: Array<{ id: string; text: string }>;
  hire_recommendation: string;
  activity_data: { month: string; commits: number; prs: number }[];
  technical_diversity: {
    languages: { id: string; name: string; percentage: number }[];
    frameworks: { id: string; name: string }[];
  };
  pull_request_metrics: {
    total: number;
    merged: number;
    average_review_time: string;
  };
  consistency_score: number;
  final_verdict: string;
}

const generateHardcodedData = (): RepositoryAnalysis => {
  const username = "demo-user";

  return {
    username,
    repository: username,
    githubUrl: "https://github.com/demo-user",

    github_score: 88,
    code_quality_score: 85,
    code_organization: "Excellent - Modular and scalable architecture",
    readme_quality: "Comprehensive and beginner friendly",

    strengths: [
      { id: "s1", text: "Clean and well-documented codebase" },
      { id: "s2", text: "Consistent commits over time" },
      { id: "s3", text: "Strong problem-solving ability" },
      { id: "s4", text: "Good use of modern frameworks" }
    ],

    red_flags: [
      { id: "r1", text: "Limited unit test coverage" },
      { id: "r2", text: "Few collaborative projects" }
    ],

    hire_recommendation: "HIGHLY RECOMMENDED",

    activity_data: [
      { month: "Jan", commits: 30, prs: 6 },
      { month: "Feb", commits: 34, prs: 8 },
      { month: "Mar", commits: 28, prs: 5 },
      { month: "Apr", commits: 36, prs: 9 },
      { month: "May", commits: 40, prs: 10 },
      { month: "Jun", commits: 38, prs: 7 }
    ],

    technical_diversity: {
      languages: [
        { id: "l1", name: "JavaScript", percentage: 30 },
        { id: "l2", name: "TypeScript", percentage: 25 },
        { id: "l3", name: "Python", percentage: 20 },
        { id: "l4", name: "Java", percentage: 15 },
        { id: "l5", name: "CSS", percentage: 10 }
      ],
      frameworks: [
        { id: "f1", name: "React" },
        { id: "f2", name: "Next.js" },
        { id: "f3", name: "Django" },
        { id: "f4", name: "FastAPI" },
        { id: "f5", name: "Express.js" }
      ]
    },

    pull_request_metrics: {
      total: 120,
      merged: 108,
      average_review_time: "10 hours"
    },

    consistency_score: 90,

    final_verdict:
      "This candidate demonstrates strong technical skills with consistent contributions and well-structured projects. Highly suitable for full-stack developer roles."
  };
};


const RecruiterResultPage = () => {

  const reportRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const data = generateHardcodedData();

  const downloadPDF = async () => {
    if (!reportRef.current) return;

    setDownloading(true);

    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      backgroundColor: "#ffffff"
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`${data.username}_report.pdf`);

    setDownloading(false);
  };

  /* ------------------------------------------------ */

  return (
    <PageWrapper>
      <DashboardLayout>

        <div ref={reportRef} className="space-y-8">

          {/* HEADER */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">{data.username}</h1>
              <p className="text-gray-500">GitHub Analysis Report</p>
            </div>

            <Button onClick={downloadPDF} disabled={downloading}>
              <Download size={18} />
              {downloading ? "Generating..." : "Download PDF"}
            </Button>
          </div>

          {/* OVERVIEW CARD */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{data.username}</CardTitle>
                  <CardDescription>
                    <a href={data.githubUrl} target="_blank">View GitHub</a>
                  </CardDescription>
                </div>

                <div className="text-right">
                  <p className="text-sm">GitHub Score</p>
                  <p className="text-5xl font-bold">{data.github_score}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <Badge className="bg-green-500">{data.hire_recommendation}</Badge>
            </CardContent>
          </Card>

          {/* CODE QUALITY */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code size={20} /> Code Quality
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p>{data.code_organization}</p>
              <p>{data.readme_quality}</p>
            </CardContent>
          </Card>

          {/* ACTIVITY CHART */}
          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>

            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.activity_data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="commits" stroke="#6366f1" />
                  <Line type="monotone" dataKey="prs" stroke="#22c55e" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* STRENGTHS & FLAGS */}
          <div className="grid md:grid-cols-2 gap-6">

            <Card>
              <CardHeader>
                <CardTitle className="flex gap-2">
                  <ThumbsUp size={20} /> Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                {data.strengths.map(s => (
                  <p key={s.id}>• {s.text}</p>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex gap-2">
                  <AlertTriangle size={20} /> Areas to Improve
                </CardTitle>
              </CardHeader>
              <CardContent>
                {data.red_flags.map(r => (
                  <p key={r.id}>• {r.text}</p>
                ))}
              </CardContent>
            </Card>

          </div>

        </div>

      </DashboardLayout>
    </PageWrapper>
  );
};

export default RecruiterResultPage;
