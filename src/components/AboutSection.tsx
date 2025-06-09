import about from "../data/about.json";
import TagItem from "./ui/TagItem.tsx";

interface AboutSectionProps {
  sectionName: "Compétences" | "Passions";
}

export const AboutSection = ({ sectionName }: AboutSectionProps) => {
  const sectionKey = sectionName === "Compétences" ? "skills" : "interests";
  return (
    <section>
      <h2 className="px-4 pt-5 pb-3 text-[22px] leading-tight font-bold tracking-[-0.015em] text-[#111418]">
        {sectionName}
      </h2>
      <div className="flex flex-wrap gap-3 p-3 pr-4">
        {about[sectionKey].map((element, index) => (
          <TagItem key={index} text={element} />
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
