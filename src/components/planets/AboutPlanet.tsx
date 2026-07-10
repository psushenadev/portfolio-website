import { Mail, User } from "lucide-react";
import GoodreadsWidget from "../widgets/goodreadsWidget";
import "../widgets/goodreads.css";
import SectionTitle from "../ui/SectionTitle";

export function AboutPlanet({ color }: { color: string }) {
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
        <SectionTitle text={"The Everyday Soundtrack"}/>
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
        <SectionTitle text={"My 'Wannabe' Bookshelf"}/>
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
