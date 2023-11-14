export type HeroHighlight = {
  title: string;
  description: string;
  cta: string;
};

// @todo see which of these need to be required
export type ProjectHighlight = {
  slug?: string;
  kicker?: string;
  title: string;
  description: string;
  projectUrl: string;
  projectCTA?: string;
  githubUrl?: string;
  cardImageUrl: string;
  cardCTA: string;
  tags: { id: string; text: string }[];
};

/* @todo use srcset once image hosting platform is setup */
export type ProjectImage = {
  src: string;
  width: number;
  height: number;
};

export type Project = ProjectHighlight & { image: ProjectImage };
