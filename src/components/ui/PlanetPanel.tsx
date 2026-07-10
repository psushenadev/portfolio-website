import { useUniverseStore } from "../../store/useUniverseStore";
import { planets } from "../../data/universeData";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, User } from "lucide-react";
import GoodreadsWidget from "../widgets/goodreadsWidget";
import "../widgets/goodreads.css";
import { useState } from "react";

export function PlanetPanel() {
  const selectedPlanet = useUniverseStore((state) => state.selectedPlanet);
  const setSelectedPlanet = useUniverseStore(
    (state) => state.setSelectedPlanet
  );

  const planet = planets.find((p) => p.id === selectedPlanet);

  return (
    <AnimatePresence>
      {planet && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute top-6 right-6 bottom-6 w-[32rem] z-10 flex flex-col pointer-events-auto"
        >
          <div
            className="glass-panel p-8 flex flex-col h-full relative overflow-y-auto"
            style={{ borderTop: `3px solid ${planet.color}` }}
          >
            <button
              onClick={() => setSelectedPlanet(null)}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={20} className="text-white/70 hover:text-white" />
            </button>

            <h2
              className="text-3xl font-bold tracking-tight mb-2"
              style={{ color: planet.color }}
            >
              {planet.name}
            </h2>

            {/*{!["contact", "experience", "skills", "projects"].includes(
              planet.id
            ) &&
              planet.description !== null && (
                <p className="text-[#95A4C2] leading-relaxed mb-8 text-sm">
                  {planet.description}
                </p>
              )}*/}

            {/* Custom Content Based on Planet */}
            <div className="flex-1">
              {planet.id === "contact" && <AboutContent color={planet.color} />}
              {planet.id === "projects" && (
                <ProjectsContent color={planet.color} />
              )}
              {planet.id === "experience" && (
                <ExperienceContent color={planet.color} />
              )}
              {planet.id === "skills" && <SkillsContent color={planet.color} />}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AboutContent({ color }: { color: string }) {
  console.log(color); // Fix unused var
  return (
    <div className="flex flex-col gap-8">
      <section>
        <p style={{ color: "white", fontSize: "1.1rem", marginTop: "1rem" }}>
          {" "}
          Based in Singapore and incoming to study Computer Engineering in
          Champaign IL, I have experience in full-stack development and machine
          learning. I aim to gain professional experience in embedded systems,
          cybersecurity and robotics. When I'm away from my keyboard, you'll
          find me reading, playing music, practicing my photography or planning
          my next engineering project.
        </p>{" "}
      </section>

      <section>
        <h3 className="text-sm tracking-widest uppercase text-white/50 mb-3">
          The Everday Soundtrack
        </h3>
        <iframe
          data-testid="embed-iframe"
          src="https://open.spotify.com/embed/playlist/17IDIjdDYvC8xVbRTxQBXn?utm_source=generator&theme=0&si=95b35fb0a9354da5"
          width="100%"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </section>

      <section>
        <h3 className="text-sm tracking-widest uppercase text-white/50 mb-4">
          My 'Wannabe' Bookshelf
        </h3>
        <GoodreadsWidget />
      </section>

      <section>
        <h3 className="text-sm tracking-widest uppercase text-white/50 mb-3">
          Contact
        </h3>
        <div className="flex flex-col gap-3">
          <a
            href="mailto:pradyun.sushena@gmail.com"
            className="flex items-center gap-3 p-4 rounded bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-white/20 group cursor-pointer"
          >
            <Mail className="text-white/50 group-hover:text-white transition-colors" />
            <span className="font-medium tracking-wide">
              pradyun.sushena@gmail.com
            </span>
          </a>
          <a
            href="mailto:sushena2@illinois.edu"
            className="flex items-center gap-3 p-4 rounded bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-white/20 group cursor-pointer"
          >
            <Mail className="text-white/50 group-hover:text-white transition-colors" />
            <span className="font-medium tracking-wide">
              sushena2@illinois.edu
            </span>
          </a>
          <a
            href="https://www.linkedin.com/in/pradyun-sushena/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 p-4 rounded bg-white/5 hover:bg-white/10 transition-colors border border-white/5 hover:border-white/20 group cursor-pointer"
          >
            <User className="text-white/50 group-hover:text-white transition-colors" />
            <span className="font-medium tracking-wide">Linkedin</span>
          </a>
        </div>
      </section>
    </div>
  );
}

function ProjectsContent({ color }: { color: string }) {
  const projects = [
    {
      title: "ChildReach Register Management System",
      period: "2024 - 2026",
      description:
        "A full-stack register and attendance management platform for ChildReach Singapore. The system replaces spreadsheet-based workflows with a secure, role-based application supporting volunteer management, attendance tracking, register creation, and analytics.",
      technologies: [
        "React",
        "TypeScript",
        "Spring Boot",
        "Java",
        "MySQL",
        "JWT Authentication",
      ],
      github: "https://github.com/psushenadev/Childreach-DBMS-Frontend",
    },
    {
      title: "SignBridge AI",
      period: "2026 – Present",
      description:
        "An AI-powered, edge-based sign language translation platform. The project uses computer vision and deep learning to translate sign language into natural language, with ongoing work focused on conversational translation and multilingual support.",
      technologies: [
        "Python",
        "PyTorch",
        "OpenCV",
        "MediaPipe",
        "Transformers",
        "GCNs",
      ],
      github: "https://github.com/YOUR_USERNAME/sign-language-translator",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <br />
      {projects.map((project) => (
        <a
          key={project.title}
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="block group"
        >
          <div className="p-5 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/7 transition-all duration-300">
            <div className="flex justify-between items-start mb-2">
              <h3
                className="font-bold text-xl transition-colors group-hover:text-white"
                style={{ color }}
              >
                {project.title}
              </h3>
            </div>
            <span className="text-s text-[#95A4C2] whitespace-nowrap">
              {project.period}
            </span>
            <p
              className="text-s text-[#D5DCEB] leading-relaxed mb-4"
              style={{ marginTop: "0.6rem" }}
            >
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-[#95A4C2]"
                  style={{ fontSize: "0.8rem" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

/*function ExperienceContent({ color }: { color: string }) {
  return (
    <div>
      <br />
      <div className="flex flex-col gap-4">
        <h3 className="text-sm tracking-widest uppercase text-white/50 mb-3">
          Education
        </h3>

        {[
          {
            institution: "The University of Illinois, Urbana-Champaign",
            role: "B.S, Computer Engineering",
            year: "August 2026 - Present",
          },
          {
            institution: "North London Collegiate School, Singapore",
            role: "IB Diploma",
            year: "September 2024 - June 2026",
          },
        ].map((exp, i) => (
          <div
            key={i}
            className="p-4 rounded bg-white/5 border border-white/5 relative pl-6"
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-l"
              style={{ backgroundColor: color, opacity: 0.8 }}
            />

            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-white">{exp.institution}</h4>
            </div>

            <div className="text-s" style={{ color }}>
              {exp.role}
            </div>
            <span className="text-sm text-[#95A4C2]">{exp.year}</span>
          </div>
        ))}
        <br />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-sm tracking-widest uppercase text-white/50 mb-3">
          Work
        </h3>

        {[
          {
            role: "Project Intern",
            company: "Techmojo Solutions",
            year: "November 2024 - January 2025",
          },
          {
            role: "Tutoring Intern",
            company: "RoboG",
            year: "April 2019 - June 2019",
          },
        ].map((exp, i) => (
          <div
            key={i}
            className="p-4 rounded bg-white/5 border border-white/5 relative pl-6"
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-l"
              style={{ backgroundColor: color, opacity: 0.8 }}
            />

            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-white">{exp.role}</h4>
            </div>

            <div className="text-s" style={{ color }}>
              {exp.company}
            </div>
            <span className="text-sm text-[#95A4C2]">{exp.year}</span>
          </div>
        ))}
        <br />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-sm tracking-widest uppercase text-white/50 mb-3">
          Research and Teams
        </h3>

        {[
          {
            role: "Graphic Designer and Design Engineer",
            company: "Romulus Racing, F1 in Schools",
            year: "November 2024 - November 2024",
          },
        ].map((exp, i) => (
          <div
            key={i}
            className="p-4 rounded bg-white/5 border border-white/5 relative pl-6"
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-l"
              style={{ backgroundColor: color, opacity: 0.8 }}
            />

            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-white">{exp.role}</h4>
            </div>

            <div className="text-s" style={{ color }}>
              {exp.company}
            </div>
            <span className="text-s text-[#95A4C2]">{exp.year}</span>
          </div>
        ))}
        <br />
      </div>
    </div>
  );
}*/
function ExperienceContent({ color }: { color: string }) {
  const experienceSections = [
    {
      title: "Education",
      items: [
        {
          title: "The University of Illinois Urbana-Champaign",
          subtitle: "B.S. Computer Engineering",
          period: "August 2026 – Present",

          summary:
            "Placeholder: Describe your coursework, extracurricular activities, projects and research interests at UIUC.",

          highlights: [
            "Computer Engineering",
            "Artificial Intelligence",
            "Robotics",
            "Embedded Systems",
          ],
        },

        {
          title: "North London Collegiate School, Singapore",
          subtitle: "International Baccalaureate Diploma",
          period: "September 2022 – June 2026",

          summary:
            "Placeholder: Discuss the IB Diploma, academic achievements, leadership positions and major projects completed during high school.",

          highlights: [
            "Mathematics AA HL",
            "Physics HL",
            "Computer Science HL",
            "French B HL",
          ],
        },
      ],
    },

    {
      title: "Work",

      items: [
        {
          title: "Techmojo Solutions",

          subtitle: "Project Intern",

          period: "November 2024 – January 2025",

          summary:
            "Placeholder: Explain your responsibilities, technical contributions and what you learned during the internship.",

          highlights: [
            "Software Development",
            "Project Management",
            "Team Collaboration",
          ],
        },

        {
          title: "RoboG",

          subtitle: "Tutoring Intern",

          period: "April 2019 – June 2019",

          summary:
            "Placeholder: Describe the robotics curriculum you taught and how you mentored younger students.",

          highlights: ["Teaching", "Robotics", "STEM Education"],
        },
      ],
    },

    {
      title: "Research & Teams",

      items: [
        {
          title: "Romulus Racing",

          subtitle: "Graphic Designer & Design Engineer",

          period: "November 2024",

          summary:
            "Placeholder: Explain your role within the Formula One in Schools team, design process and engineering responsibilities.",

          highlights: [
            "CAD",
            "Graphic Design",
            "Engineering Design",
            "F1 in Schools",
          ],
        },
      ],
    },
  ];
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="space-y-10">
      {experienceSections.map((section) => (
        <section key={section.title}>
          <h3 className="text-sm tracking-widest uppercase text-white/50 mb-4">
            {section.title}
          </h3>

          <div className="space-y-4">
            {section.items.map((exp) => {
              const expanded = open === exp.title;

              return (
                <motion.div
                  key={exp.title}
                  layout
                  transition={{
                    layout: {
                      duration: 0.35,
                    },
                  }}
                  className="rounded-xl bg-white/5 border border-white/10 overflow-hidden"
                >
                  <button
                    onClick={() => setOpen(expanded ? null : exp.title)}
                    className="w-full text-left p-5 hover:bg-white/5 transition cursor-pointer"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-bold text-lg" style={{ color }}>
                          {exp.title}
                        </h4>

                        <p className="text-white mt-1">{exp.subtitle}</p>

                        <p className="text-sm text-[#95A4C2] mt-2">
                          {exp.period}
                        </p>
                      </div>

                      <motion.div
                        animate={{
                          rotate: expanded ? 180 : 0,
                        }}
                      ></motion.div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {expanded && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          height: 0,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                        }}
                        transition={{
                          duration: 0.25,
                        }}
                        className="px-5 pb-5"
                      >
                        <div className="border-t border-white/10 pt-5">
                          <p className="text-[#D5DCEB] leading-7 mb-5">
                            {exp.summary}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {exp.highlights.map((item) => (
                              <span
                                key={item}
                                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

/*function Section({
  title,
  items,
  color,
}: {
  title: string;
  items?: string[];
  color: string;
}) {
  if (!items?.length) return null;

  return (
    <div className="mb-6">
      <h4
        className="uppercase tracking-[0.25em] text-xs mb-3"
        style={{ color }}
      >
        {title}
      </h4>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}*/

function SkillsContent({ color }: { color: string }) {
  console.log(color); // Fix unused var
  const skillGroups = [
    {
      title: "Frontend",
      skills: ["React", "TypeScript", "Three.js", "Tailwind"],
    },
    { title: "Backend", skills: ["Node.js", "Python", "PostgreSQL", "Redis"] },
  ];
  return (
    <div className="flex flex-col gap-6">
      {skillGroups.map((group, i) => (
        <div key={i}>
          <h3 className="text-sm tracking-widest uppercase text-white/50 mb-3">
            {group.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded bg-white/5 border border-white/10 text-sm text-[#D5DCEB]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
