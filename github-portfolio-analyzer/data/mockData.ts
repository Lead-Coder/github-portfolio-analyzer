
import { StudentAnalysisResult, RecruiterAnalysisResult } from '../types';

export const mockStudentResult: StudentAnalysisResult = {
  username: 'jane-doe-dev',
  avatarUrl: 'https://picsum.photos/seed/janedoe/200',
  overallScore: 88,
  scoreBreakdown: {
    documentation: 92,
    codeQuality: 85,
    consistency: 95,
    projectImpact: 80,
    technicalDepth: 90,
  },
  strengths: [
    'Excellent README documentation on major projects.',
    'Consistent commit history over the last 6 months.',
    'High code quality with good use of modern practices.',
    'Active participant in open-source projects.',
  ],
  redFlags: [
    'Some projects lack unit tests.',
    'Inconsistent use of code formatting in older repositories.',
  ],
  improvementSuggestions: [
    {
      title: 'Increase Test Coverage',
      description: 'Add unit and integration tests to key projects like "Project-X" to demonstrate reliability.',
    },
    {
      title: 'Standardize Code Formatting',
      description: 'Use a tool like Prettier or ESLint across all your repositories to ensure consistent code style.',
    },
    {
        title: 'Enhance Project Descriptions',
        description: 'Update GitHub project descriptions to be more descriptive and include live demo links where applicable.'
    }
  ],
  contributionData: Array.from({ length: 365 }, () => Math.floor(Math.random() * 20)),
};


export const mockRecruiterResult: RecruiterAnalysisResult = {
    candidateName: "John Doe",
    username: "john-doe-coder",
    avatarUrl: "https://picsum.photos/seed/johndoe/200",
    overallScore: 92,
    hireRecommendation: 'Strong Fit',
    skillMatch: [
        { skill: 'React', score: 95 },
        { skill: 'TypeScript', score: 90 },
        { skill: 'Node.js', score: 85 },
        { skill: 'GraphQL', score: 70 },
        { skill: 'CI/CD', score: 88 },
    ],
    strengths: [
        'Deep expertise in React and its ecosystem.',
        'Strong evidence of writing clean, maintainable TypeScript.',
        'Consistent contributions and ownership of large projects.',
    ],
    weaknesses: [
        'Limited experience with GraphQL compared to other skills.',
        'Fewer projects demonstrating backend-focused Node.js skills.',
    ],
    riskFlags: [
        'No recent contributions to public open-source projects (last 6 months).',
    ],
    finalVerdict: "John is an exceptionally strong candidate for the Senior Frontend Engineer role. His GitHub profile showcases advanced proficiency in our core technologies and a commitment to high-quality code. While his GraphQL experience is less prominent, his overall skill set and project history make him a top-tier applicant worth pursuing immediately."
}
