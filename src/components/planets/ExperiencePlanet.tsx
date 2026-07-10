import { experienceSections } from "../../data/experienceData";
import ExperienceCard from "../experience/ExperienceCard";

export function ExperiencePlanet({ color }: { color: string }) {    
  
    return (
      <div className="space-y-10">
        {experienceSections.map((section) => (
          <ExperienceCard section={section} color={color}/>
        ))}
      </div>
    );
  }