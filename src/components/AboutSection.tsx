import about from "../data/about.json";
import TagItem from "./Items/TagItem.tsx";

interface AboutSectionProps {
  sectionName: "Compétences" | "Passions";
}

export const AboutSection = ({ sectionName }: AboutSectionProps) => {
  const sectionKey = sectionName === "Compétences" ? "skills" : "interests";
  return (
    <section>
      <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        {sectionName}
      </h2>
      <div className="flex gap-3 p-3 flex-wrap pr-4">
        {about[sectionKey].map((element, index) => (
          <TagItem key={index} text={element} />
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
