import { ProjectCardProps } from "./ProjectCard.types.ts";

export const ProjectCard = ({
  title,
  description,

  imageUrl,
  github_link,
  visit_link,
  key_points,
  technos,
}: ProjectCardProps) => {
  return (
    <div className="flex gap-8 rounded-xl border border-[#d2d6db] bg-white p-8 font-[Manrope] mx-auto max-w-3/4">
      <div className="max-w-1/2 shrink-0 mx-auto">
        <a href={visit_link ?? "#"}>
          <img
            src={imageUrl}
            alt={`${title} screenshot`}
            className="h-full w-full object-cover rounded-xl shadow-md hover:cursor-pointer"
          />
        </a>
      </div>
      {/* Contenu à droite */}
      <div className="flex w-1/3 flex-col gap-6">
        <div className="flex flex-col gap-3">
          <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em]">
            {title}
          </h2>
          <p className="text-[#637588] text-base font-normal leading-normal">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-[#111418] text-base font-bold leading-tight">
            Points clés
          </h3>
          <ul className="flex flex-col gap-2">
            {key_points.map((point) => (
              <li
                key={point}
                className="flex items-center gap-3 text-[#111418]"
              >
                <svg className="w-4 h-4 text-[#637588]" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15h4v-2h-4v2zm0-4h4V7h-4v6z"
                  ></path>
                </svg>
                <span className="text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-[#111418] text-base font-bold leading-tight">
            Technologies
          </h3>
          <ul className="flex flex-wrap gap-2">
            {technos.map((tech) => (
              <li
                key={tech}
                className="flex h-8 shrink-0 items-center rounded-xl bg-[#f0f2f4] px-4 text-sm text-[#111418] transition-colors hover:bg-[#e4e7ea]"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3 mt-auto">
          <a
            href={visit_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center rounded-xl h-10 bg-[#1980e6] text-white font-bold transition-colors hover:bg-[#1873d1]"
          >
            Visiter
          </a>
          <a
            href={github_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center rounded-xl h-10 border border-[#dce0e5] text-[#111418] font-bold  transition-colors hover:bg-[#f0f2f4]"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
