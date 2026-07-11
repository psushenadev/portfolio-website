interface SectionTitleProps {
  text: string;
}

export default function SectionTitle({ text }: SectionTitleProps) {
  return (
    <div>
      <h3 className="text-sm tracking-widest uppercase text-white/50 mb-3">
        {" "}
        {text}{" "}
      </h3>
    </div>
  );
}
