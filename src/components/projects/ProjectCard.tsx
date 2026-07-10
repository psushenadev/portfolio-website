export default function ProjectCard({ project, color }) {
  return (
    <div>
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
    </div>
  );
}
