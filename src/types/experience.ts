export interface Experience {
    title: string;
    subtitle: string;
    period: string;
    summary: string;
    highlights: string[];
  }
  
  export interface ExperienceSection {
    title: string;
    items: Experience[];
  }
  
  export interface ExperienceCardProps {
    section: ExperienceSection;
    color: string;
  }