import { projects } from "../../data/projectsData";
import ProjectCard from "../projects/ProjectCard";

export function ProjectsPlanet({ color }: { color: string }) {
  return (
    <div className="flex flex-col gap-5">
      <br />
      {projects.map((project) => (
        <ProjectCard project={project} color={color}/>
      ))}
    </div>
  );
}
