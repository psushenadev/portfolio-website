import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function ExperienceCard({ section, color }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div>
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
    </div>
  );
}
