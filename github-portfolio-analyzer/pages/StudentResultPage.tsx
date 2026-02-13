import React, { useRef, useState } from "react";
import {
  ThumbsUp,
  AlertTriangle,
  Download,
  Lightbulb,
  Code,
  Star,
  GitCommit,
  GitPullRequest,
  Folder,
} from "lucide-react";

import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import {
  ResponsiveContainer,
  BarChart,
  LineChart,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

import PageWrapper from "../components/PageWrapper";
import DashboardLayout from "../layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

const data = {
  username: "Student Profile",
  githubUrl: "https://github.com/demo-student",

  overall_score: 86,
  total_repositories: 28,
  total_stars: 134,
  total_forks: 42,
  total_commits_year: 742,
  longest_streak: 21,
  current_streak: 8,

  code_quality_score: 84,
  consistency_score: 88,
  documentation_score: 80,
  technical_depth_score: 82,

  strengths: [
    { id: "1", text: "Well structured full stack projects" },
    { id: "2", text: "Strong commit consistency" },
    { id: "3", text: "Good documentation habits" },
    { id: "4", text: "Uses modern frameworks effectively" },
  ],

  red_flags: [
    { id: "1", text: "Limited automated testing" },
    { id: "2", text: "Few collaborative contributions" },
  ],

  improvement_suggestions: [
    {
      id: "1",
      title: "Increase Test Coverage",
      description: "Add unit + integration tests to improve reliability.",
      priority: "high",
    },
    {
      id: "2",
      title: "Add CI/CD",
      description: "Set up GitHub Actions for automation.",
      priority: "medium",
    },
    {
      id: "3",
      title: "Open Source Contributions",
      description: "Contribute to active public repos.",
      priority: "low",
    },
  ],

  monthly_activity: [
    { month: "Jan", commits: 60 },
    { month: "Feb", commits: 72 },
    { month: "Mar", commits: 65 },
    { month: "Apr", commits: 80 },
    { month: "May", commits: 90 },
    { month: "Jun", commits: 75 },
  ],

  weekly_activity: [
    { week: "W1", commits: 18 },
    { week: "W2", commits: 22 },
    { week: "W3", commits: 15 },
    { week: "W4", commits: 25 },
  ],

  language_distribution: [
    { name: "JavaScript", value: 35 },
    { name: "TypeScript", value: 25 },
    { name: "Python", value: 20 },
    { name: "Java", value: 15 },
    { name: "Other", value: 5 },
  ],

  radar_scores: [
    { subject: "Code Quality", A: 84 },
    { subject: "Consistency", A: 88 },
    { subject: "Documentation", A: 80 },
    { subject: "Technical Depth", A: 82 },
    { subject: "Impact", A: 78 },
  ],
};

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"];

const StudentResultPage = () => {
  const reportRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const downloadPDF = async () => {
    if (!reportRef.current) return;
    setDownloading(true);

    const canvas = await html2canvas(reportRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 0, 0, 210, (canvas.height * 210) / canvas.width);
    pdf.save(`${data.username}_full_report.pdf`);

    setDownloading(false);
  };

  return (
    <PageWrapper>
      <DashboardLayout>

        <div ref={reportRef} className="space-y-8">

          {/* HEADER */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">{data.username}</h1>
              <p className="text-gray-500">Complete GitHub Performance Report</p>
            </div>
            <Button onClick={downloadPDF}>
              <Download size={18} />
              {downloading ? "Generating..." : "Download PDF"}
            </Button>
          </div>

          {/* OVERVIEW STATS */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card><CardContent className="p-6 text-center"><Folder /> <p>{data.total_repositories}</p><p>Repositories</p></CardContent></Card>
            <Card><CardContent className="p-6 text-center"><Star /> <p>{data.total_stars}</p><p>Total Stars</p></CardContent></Card>
            <Card><CardContent className="p-6 text-center"><GitCommit /> <p>{data.total_commits_year}</p><p>Commits (Year)</p></CardContent></Card>
            <Card><CardContent className="p-6 text-center"><GitPullRequest /> <p>{data.total_forks}</p><p>Total Forks</p></CardContent></Card>
          </div>

          {/* RADAR CHART */}
          <Card>
            <CardHeader><CardTitle>Performance Breakdown</CardTitle></CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={data.radar_scores}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* MONTHLY ACTIVITY */}
          <Card>
            <CardHeader><CardTitle>Monthly Commits</CardTitle></CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer>
                <LineChart data={data.monthly_activity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="commits" stroke="#6366f1" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* LANGUAGE PIE */}
          <Card>
            <CardHeader><CardTitle>Language Distribution</CardTitle></CardHeader>
            <CardContent className="h-[350px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data.language_distribution}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    label
                  >
                    {data.language_distribution.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* STRENGTHS & WEAKNESSES */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle><ThumbsUp /> Strengths</CardTitle></CardHeader>
              <CardContent>{data.strengths.map(s => <p key={s.id}>• {s.text}</p>)}</CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle><AlertTriangle /> Areas to Improve</CardTitle></CardHeader>
              <CardContent>{data.red_flags.map(r => <p key={r.id}>• {r.text}</p>)}</CardContent>
            </Card>
          </div>

          {/* IMPROVEMENTS */}
          <Card>
            <CardHeader><CardTitle><Lightbulb /> Improvement Roadmap</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {data.improvement_suggestions.map(s => (
                <div key={s.id} className="border p-4 rounded-lg">
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{s.title}</h3>
                    <Badge>{s.priority}</Badge>
                  </div>
                  <p className="text-gray-600">{s.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>

      </DashboardLayout>
    </PageWrapper>
  );
};

export default StudentResultPage;
