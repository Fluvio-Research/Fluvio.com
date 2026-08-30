export interface SiteContent {
  name: string;
  tagline: string;
  summary: string;
  heroImage: string;
  heroAlt: string;
  vision: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  values: Array<{ title: string; description: string }>;
}

export interface Project {
  title: string;
  slug: string;
  summary: string;
  location?: string;
  timeframe?: string;
  disciplines: string[];
  partners?: string[];
  heroImage: string;
  heroAlt: string;
  gallery?: Array<{ src: string; alt: string; caption?: string }>;
  challenge: string[];
  approach: string[];
  outcome: string[];
  featured?: boolean;
  relatedProjects?: string[];
}

export interface TeamMember {
  name: string;
  role?: string;
  bio: string;
  portrait: string;
  portraitAlt: string;
  specialties: string[];
  profileUrl?: string;
}

export interface ExpertiseArea {
  title: string;
  slug: string;
  summary: string;
  description: string[];
  image: string;
  imageAlt: string;
  relatedProjects: string[];
}
