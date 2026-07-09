import { useUniverseStore } from "../../store/useUniverseStore";
import { planets } from "../../data/universeData";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Code, Mail, User } from "lucide-react";
import './goodreads.css';

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
            <p className="text-[#95A4C2] leading-relaxed mb-8 text-sm">
              {planet.description}
            </p>

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
              {planet.id === "archive" && (
                <ArchiveContent color={planet.color} />
              )}
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
        <h3 className="text-sm tracking-widest uppercase text-white/50 mb-3">
          Education
        </h3>
        <div className="p-4 rounded bg-white/5 border border-white/5">
          <h4 className="font-bold text-white mb-1">
            University of Illinois, Urbana-Champaign
          </h4>
          <p className="text-sm" style={{ color }}>
            B.Sc, Computer Engineering
          </p>
          <p className="text-xs text-[#95A4C2] mt-2">2026 - 2030</p>
        </div>
      </section>

      <section>
        <h3 className="text-sm tracking-widest uppercase text-white/50 mb-3">
          Hobbies
        </h3>
        <div className="flex flex-wrap gap-2">
          {["Robotics", "3D Modeling", "Photography", "Reading"].map(
            (hobby) => (
              <span
                key={hobby}
                className="px-3 py-1 rounded bg-white/5 border border-white/10 text-sm text-[#D5DCEB]"
              >
                {hobby}
              </span>
            )
          )}
        </div>
      </section>
      <section>
        <h3 className="text-sm tracking-widest uppercase text-white/50 mb-3">
          The Everday Soundtrack!
        </h3>
        <iframe
          data-testid="embed-iframe"
          //style="border-radius:12px"
          src="https://open.spotify.com/embed/playlist/17IDIjdDYvC8xVbRTxQBXn?utm_source=generator&theme=0&si=95b35fb0a9354da5"
          width="100%"
          height="352"
          frameBorder="0"
          //allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </section>
      <div id="gr_custom_widget_1783565392">
        <div className="gr_custom_container_1783565392">
          <h2 className="gr_custom_header_1783565392">
            <a
              //style="text-decoration: none"
              rel="nofollow"
              href="https://www.goodreads.com/review/list/201900410-pradyun-sushena?shelf=to-read&amp;utm_medium=api&amp;utm_source=custom_widget"
            >
              Pradyun&#39;s To-Read-List
            </a>
          </h2>
          <div className="gr_custom_each_container_1783565392">
            <div className="gr_custom_book_container_1783565392">
              <a
                title="The Sailor Who Fell from Grace with the Sea"
                rel="nofollow"
                href="https://www.goodreads.com/review/show/8735522986?utm_medium=api&amp;utm_source=custom_widget"
              >
                <img
                  alt="The Sailor Who Fell from Grace with the Sea"
                  //border="none"
                  src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1327629352l/162332._SY75_.jpg"
                />
              </a>
            </div>
            <div className="gr_custom_title_1783565392">
              <a
                rel="nofollow"
                href="https://www.goodreads.com/review/show/8735522986?utm_medium=api&amp;utm_source=custom_widget"
              >
                The Sailor Who Fell from Grace with the Sea
              </a>
            </div>
            <div className="gr_custom_author_1783565392">
              by
              <a
                rel="nofollow"
                href="https://www.goodreads.com/author/show/35258.Yukio_Mishima"
              >
                Yukio Mishima
              </a>
            </div>
          </div>
          <div className="gr_custom_each_container_1783565392">
            <div className="gr_custom_book_container_1783565392">
              <a
                title="Dungeon Crawler Carl (Dungeon Crawler Carl, #1)"
                rel="nofollow"
                href="https://www.goodreads.com/review/show/8735544337?utm_medium=api&amp;utm_source=custom_widget"
              >
                <img
                  alt="Dungeon Crawler Carl"
                  //border="0"
                  src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1715780755l/211721806._SY75_.jpg"
                />
              </a>
            </div>
            <div className="gr_custom_title_1783565392">
              <a
                rel="nofollow"
                href="https://www.goodreads.com/review/show/8735544337?utm_medium=api&amp;utm_source=custom_widget"
              >
                Dungeon Crawler Carl
              </a>
            </div>
            <div className="gr_custom_author_1783565392">
              by
              <a
                rel="nofollow"
                href="https://www.goodreads.com/author/show/999015.Matt_Dinniman"
              >
                Matt Dinniman
              </a>
            </div>
          </div>
          <div className="gr_custom_each_container_1783565392">
            <div className="gr_custom_book_container_1783565392">
              <a
                title="The Plague"
                rel="nofollow"
                href="https://www.goodreads.com/review/show/8735549512?utm_medium=api&amp;utm_source=custom_widget"
              >
                <img
                  alt="The Plague"
                 // border="0"
                  src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1503362434l/11989._SY75_.jpg"
                />
              </a>
            </div>
            <div className="gr_custom_title_1783565392">
              <a
                rel="nofollow"
                href="https://www.goodreads.com/review/show/8735549512?utm_medium=api&amp;utm_source=custom_widget"
              >
                The Plague
              </a>
            </div>
            <div className="gr_custom_author_1783565392">
              by
              <a
                rel="nofollow"
                href="https://www.goodreads.com/author/show/957894.Albert_Camus"
              >
                Albert Camus
              </a>
            </div>
          </div>
          <div className="gr_custom_each_container_1783565392">
            <div className="gr_custom_book_container_1783565392">
              <a
                title="Slaughterhouse-Five"
                rel="nofollow"
                href="https://www.goodreads.com/review/show/8735555185?utm_medium=api&amp;utm_source=custom_widget"
              >
                <img
                  alt="Slaughterhouse-Five"
               //   border="0"
                  src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1621066364l/58047680._SY75_.jpg"
                />
              </a>
            </div>
            <div className="gr_custom_title_1783565392">
              <a
                rel="nofollow"
                href="https://www.goodreads.com/review/show/8735555185?utm_medium=api&amp;utm_source=custom_widget"
              >
                Slaughterhouse-Five
              </a>
            </div>
            <div className="gr_custom_author_1783565392">
              by
              <a
                rel="nofollow"
                href="https://www.goodreads.com/author/show/2778055.Kurt_Vonnegut_Jr_"
              >
                Kurt Vonnegut Jr.
              </a>
            </div>
          </div>
          <div className="gr_custom_each_container_1783565392">
            <div className="gr_custom_book_container_1783565392">
              <a
                title="Giovanni’s Room"
                rel="nofollow"
                href="https://www.goodreads.com/review/show/8735562561?utm_medium=api&amp;utm_source=custom_widget"
              >
                <img
                  alt="Giovanni’s Room"
                  //border="0"
                  src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1657560790l/17288631._SY75_.jpg"
                />
              </a>
            </div>
            <div className="gr_custom_title_1783565392">
              <a
                rel="nofollow"
                href="https://www.goodreads.com/review/show/8735562561?utm_medium=api&amp;utm_source=custom_widget"
              >
                Giovanni’s Room
              </a>
            </div>
            <div className="gr_custom_author_1783565392">
              by
              <a
                rel="nofollow"
                href="https://www.goodreads.com/author/show/10427.James_Baldwin"
              >
                James Baldwin
              </a>
            </div>
          </div>
          <br /*style="clear: both"*/ />
          <center>
            <a rel="nofollow" href="https://www.goodreads.com/">
              <img
                alt="goodreads.com"
               // style="border: 0"
                src="https://s.gr-assets.com/images/widget/widget_logo.gif"
              />
            </a>
          </center>
          <noscript>
            Share
            <a rel="nofollow" href="https://www.goodreads.com/">
              book reviews
            </a>{" "}
            and ratings with Pradyun, and even join a
            <a rel="nofollow" href="https://www.goodreads.com/group">
              book club
            </a>{" "}
            on Goodreads.
          </noscript>
        </div>
      </div>
      <section>
        <h3 className="text-sm tracking-widest uppercase text-white/50 mb-3">
          My 'Wannabe' Bookshelf
        </h3>
        <script
          src="https://www.goodreads.com/review/custom_widget/201900410.Pradyun's%20To-Read-List?cover_position=left&cover_size=small&num_books=5&order=a&shelf=to-read&show_author=1&show_cover=1&show_rating=0&show_review=0&show_tags=0&show_title=1&sort=date_added&widget_bg_color=FFFFFF&widget_bg_transparent=&widget_border_width=1&widget_id=1783565392&widget_text_color=000000&widget_title_size=medium&widget_width=medium"
          type="text/javascript"
        ></script>
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
    <div className="flex flex-col gap-4">
      {[
        {
          role: "Senior Engineer",
          company: "Tech Corp",
          year: "2023 - Present",
        },
        {
          role: "Frontend Developer",
          company: "Startup Inc",
          year: "2021 - 2023",
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
            <span className="text-xs text-[#95A4C2]">{exp.year}</span>
          </div>
          <div className="text-sm" style={{ color: color }}>
            {exp.company}
          </div>
        </div>
      ))}
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

function ArchiveContent({ color }: { color: string }) {
  console.log(color); // Fix unused var
  return (
    <div className="grid grid-cols-2 gap-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="aspect-square rounded bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer group"
        >
          <span className="text-white/30 group-hover:text-white/80 text-xs tracking-widest">
            EXP_{i}
          </span>
        </div>
      ))}
    </div>
  );
}
