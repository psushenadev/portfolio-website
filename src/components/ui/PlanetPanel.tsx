import { useUniverseStore } from "../../store/useUniverseStore";
import { planets } from "../../data/universeData";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Code, Mail, User } from "lucide-react";
import GoodreadsWidget from "../../widgets/goodreadsWidget";
import "../../widgets/goodreads.css";

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
            {planet.id !== "contact" && (
              <p className="text-[#95A4C2] leading-relaxed mb-8 text-sm">
                {planet.description}
              </p>
            )}

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
          The Everday Soundtrack!
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
  return (
    <div className="flex flex-col gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-4 rounded bg-white/5 border border-white/5 hover:border-white/20 transition-all group"
        >
          <h3
            className="font-bold text-lg mb-1 group-hover:text-white transition-colors"
            style={{ color: color }}
          >
            Project Alpha {i}
          </h3>
          <p className="text-sm text-[#D5DCEB] mb-3">
            A brief description of this amazing project showcasing React and
            Three.js.
          </p>
          <div className="flex gap-3">
            <button className="text-xs flex items-center gap-1 text-[#95A4C2] hover:text-white transition-colors cursor-pointer">
              <Code size={14} /> Code
            </button>
            <button className="text-xs flex items-center gap-1 text-[#95A4C2] hover:text-white transition-colors cursor-pointer">
              <ExternalLink size={14} /> Live Demo
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExperienceContent({ color }: { color: string }) {
  return (
    <div>
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
}

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
