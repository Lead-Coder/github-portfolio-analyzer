
export type UserRole = 'student' | 'recruiter' | null;

export interface ScoreBreakdown {
  documentation: number;
  codeQuality: number;
  consistency: number;
  projectImpact: number;
  technicalDepth: number;
}

export interface StudentAnalysisResult {
  username: string;
  avatarUrl: string;
  overallScore: number;
  scoreBreakdown: ScoreBreakdown;
  strengths: string[];
  redFlags: string[];
  improvementSuggestions: { title: string; description: string }[];
  contributionData: number[];
}


export interface RecruiterAnalysisResult {
    candidateName: string;
    username: string;
    avatarUrl: string;
    overallScore: number;
    hireRecommendation: 'Strong Fit' | 'Moderate Fit' | 'Not Recommended';
    skillMatch: { skill: string; score: number }[];
    strengths: string[];
    weaknesses: string[];
    riskFlags: string[];
    finalVerdict: string;
}
