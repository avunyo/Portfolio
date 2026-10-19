import { PortfolioData } from "./types";

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  name: "Polina",
  bioHero: "Kreative Projekte, neue Sportarten und große Ziele: Ich probiere gern aus, was mich neugierig macht. Gerade trainiere ich für meinen ersten Marathon.",
  bioAbout: "Ich bin Polina: neugierig, gern in Bewegung und fast immer für eine neue Idee zu haben. Hier sammle ich kleine und große Dinge, die ich ausprobiere, lerne und selbst gestalte.",
  email: "",
  instagram: "",
  linkedin: "",
  interests: [
    { name: "Neues ausprobieren" },
    { name: "Sport" },
    { name: "Marathon-Training" },
    { name: "Kreativ sein" },
  ],
  projects: [
    {
      id: "things-ive-made",
      number: "01",
      title: "Projekte & Ideen",
      description: "Schulprojekte und kreative Experimente, die ich selbst gestaltet habe.",
      tags: ["Projekte", "Kreativität"],
    },
    {
      id: "writing-and-ideas",
      number: "02",
      title: "Texte & Gedanken",
      description: "Gedanken, Texte und Ideen, die ich festhalten und weiterentwickeln möchte.",
      tags: ["Schreiben", "Ideen"],
    },
    {
      id: "sport-and-challenges",
      number: "03",
      title: "Sport & Herausforderungen",
      description: "Neue Sportarten entdecken und Schritt für Schritt auf meinen ersten Marathon hinarbeiten.",
      tags: ["Sport", "Marathon"],
    },
    {
      id: "new-things",
      number: "04",
      title: "Immer dabei",
      description: "Ein neues Hobby oder eine spontane Herausforderung? Ich bin dabei.",
      tags: ["Neugier", "Ausprobieren"],
    },
  ],
};
