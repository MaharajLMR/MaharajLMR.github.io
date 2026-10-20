export type Category =
  | 'Robotics & Control'
  | 'Perception & Vision'
  | 'AI Systems'
  | 'Embedded & Hardware'
  | 'Machine Learning';

export type Environment = 'Simulation' | 'Real hardware' | 'Both' | 'Software only';

export type Status = 'Complete' | 'In progress' | 'Paper in preparation' | 'Published';

export type MediaItem = {
  type: 'image' | 'video';
  src: string;
  poster?: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

export type Decision = { decision: string; why: string };

export type Result = {
  label: string;
  value: string;
  unit: string;
  context: string;
  headline?: boolean;
};

export type Failure = { what: string; fix: string };

export type StoryStep = { label: string; title: string; body: string };

export type ArchitectureStage = { title: string; items: string[] };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: Category;
  featured: boolean;
  rank: number;
  date: string;
  timeline: string;
  oneLineProblem: string;
  problem: string;
  constraints: string[];
  approach: Decision[];
  architecture: { summary: string; stages: ArchitectureStage[] };
  results: Result[];
  failures: Failure[];
  myRole: string;
  teamSize: number;
  environment: Environment;
  status: Status;
  stack: string[];
  media: { hero: MediaItem; gallery: MediaItem[] };
  links: { repo?: string; demo?: string; paper?: string };
  next: string[];
  pinnedStory?: StoryStep[];
};

export type MoreProject = {
  slug: string;
  title: string;
  line: string;
  stack: string[];
  status: string;
  note: string;
};

export type Site = {
  name: string;
  roleLine: string;
  identityLine: string;
  proofStrip: string[];
  bio: string[];
  lookingFor: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  resumePdf: string;
  avatar: string;
  education: { degree: string; institution: string; period: string; detail: string }[];
  experience: { role: string; org: string; period: string; detail: string }[];
  achievements: { title: string; detail: string; project: string }[];
  skills: { group: string; items: string[] }[];
  seo: { title: string; description: string; url: string };
};
