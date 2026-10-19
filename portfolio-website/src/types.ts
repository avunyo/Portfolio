export interface PortfolioData {
  name: string;
  bioHero: string;
  bioAbout: string;
  email: string;
  instagram: string;
  linkedin: string;
  interests: {
    name: string;
  }[];
  projects: {
    id: string;
    number: string;
    title: string;
    description: string;
    tags: string[];
    image?: string;
  }[];
}
