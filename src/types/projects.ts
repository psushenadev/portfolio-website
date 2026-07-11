export interface Project {
    title: string;
    period: string;
    description: string;
    technologies: string[];
    github: string;
  }
  
  export interface ProjectCardProps {
    project: Project;
    color: string;
  }