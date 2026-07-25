export interface PortfolioData {
  name: string;
  role: string;
  city: string;
  bioHero: string;
  bioAbout: string;
  email: string;
  instagram: string;
  linkedin: string;
  stats: {
    years: number;
    projects: number;
    clients: number;
  };
  skills: {
    name: string;
    level: number; // 0 to 100
  }[];
  projects: {
    id: string;
    number: string;
    title: string;
    description: string;
    tags: string[];
    link: string;
    isFeatured?: boolean;
  }[];
  services: {
    id: string;
    number: string;
    name: string;
    description: string;
  }[];
}
