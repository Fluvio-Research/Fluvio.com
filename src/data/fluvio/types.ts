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

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
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
  gallery?: GalleryImage[];
  challenge: string[];
  approach: string[];
  outcome: string[];
  featured?: boolean;
  relatedProjects?: string[];
}

export interface TeamMember {
  /** Route segment; defaults to the record's file name. */
  slug: string;
  name: string;
  role?: string;
  bio: string;
  portrait: string;
  portraitAlt: string;
  specialties: string[];
  /** Where the person is based, when the profile says so. */
  location?: string;
  profileUrl?: string;
  /** Expertise areas (by slug) the person practises in. */
  expertise?: string[];
  /** Projects (by slug) the person is named on. */
  projects?: string[];
}

export interface ExpertiseArea {
  title: string;
  slug: string;
  summary: string;
  description: string[];
  /** Short capability statements listed on the area's own page. */
  highlights?: string[];
  image: string;
  imageAlt: string;
  video?: string;
  relatedProjects: string[];
}
