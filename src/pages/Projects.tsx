import { ProjectCard } from "../components/Cards/ProjectCard.tsx";
import banner from "../assets/images/project_banner.png";
import projects from "../data/projects.json";

export const Projects = () => {
  return (
    <>
      <img
        src={banner}
        alt="banner"
        className="object-cover mb-6 mx-auto max-w-xl w-full"
      />{" "}
      <div className="flex flex-col gap-12">
        {projects.map((project) => (
          <ProjectCard
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
            visit_link={project.visit_link}
            github_link={project.github_link}
            key_points={project.key_points}
            technos={project.technos}
            key={project.title}
          />
        ))}
      </div>
    </>
  );
};

export default Projects;
