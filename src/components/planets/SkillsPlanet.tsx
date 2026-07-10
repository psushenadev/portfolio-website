import { SkillGroups } from "../../data/skillsData";
import SectionTitle from "../ui/SectionTitle";

export function SkillsPlanet({ color }: { color: string }) {
    console.log(color); // Fix unused var
    
    return (
      <div className="flex flex-col gap-6">
        {SkillGroups.map((group, i) => (
          <div key={i}>
            <SectionTitle text={group.title}/>
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
  