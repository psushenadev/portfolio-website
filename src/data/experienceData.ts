export interface Experience {
    institution: string;
    role: string;
    period: string;
    summary: string;
    coursework?: string[];
    technologies?: string[];
    projects?: string[];
  }
  
  export const experiences: Experience[] = [
    {
      institution: "University of Illinois Urbana-Champaign",
      role: "B.S. Computer Engineering",
      period: "August 2026 – Present",
  
      summary:
        "Studying Computer Engineering with a focus on artificial intelligence, robotics and embedded systems while pursuing independent software projects.",
  
      coursework: [
        "Artificial Intelligence",
        "Computer Architecture",
        "Robotics",
        "Embedded Systems"
      ],
  
      technologies: [
        "C++",
        "Python",
        "Linux",
        "Git"
      ],
  
      projects: [
        "Project Helios",
        "Sign Language Translator"
      ]
    },
  
    {
      institution: "North London Collegiate School Singapore",
      role: "International Baccalaureate Diploma",
      period: "2022 – 2026",
  
      summary:
        "Graduated with Higher Level Mathematics AA, Physics, Computer Science and French while developing numerous engineering and software projects.",
  
      coursework: [
        "Mathematics AA HL",
        "Physics HL",
        "Computer Science HL",
        "History SL",
        "French B HL"
      ],
  
      technologies: [
        "Java",
        "Python",
        "MySQL"
      ],
  
      projects: [
        "ChildReach Database",
        "World Cup Monte Carlo Model"
      ]
    }
  ];