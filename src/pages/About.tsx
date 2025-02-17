import banner from "../assets/images/about_banner.png";
import about from "../data/about.json";
import EducationListItem from "../components/Items/EducationListItem.tsx";
import TagItem from "../components/Items/TagItem.tsx";

export const About = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden font-[Manrope]">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:px-4 @[480px]:py-3">
                <img
                  src={banner}
                  alt="header banner"
                  className="object-cover mb-4 mx-auto max-w-md w-full"
                />
              </div>
            </div>
            <div className="flex p-4 @container">
              <div className="flex w-full flex-col gap-4 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
                <div className="flex gap-4">
                  <div className="flex flex-col gap-3 justify-center">
                    <p className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em]">
                      Développeur web et logiciel
                    </p>
                    <p className="text-[#111418] text-base font-normal leading-normal">
                      Développeur et concepteur Web depuis plus de cinq ans. Je
                      suis un amoureux de la création de sites web esthétique et
                      fonctionnels et je contribue au développement de sociétés
                      grâce à la création de solutions numériques innovantes.
                      Spécialisé dans le développement front-end, je maîtrise
                      également le back-end ainsi que l&#39;expérience
                      utilisateur. Toujours en quête d’amélioration, j’apprends
                      continuellement de nouvelles technologies afin de
                      perfectionner mes compétences et de rester à la pointe des
                      tendances du web. Mon objectif est de fournir un travail
                      de qualité qui surprend les attentes de mes clients. Je
                      donne un soin particulier au référencement SEO de manière
                      à assurer une visibilité maximale ainsi qu’à l’impact
                      écologique de mes services, en adoptant des pratiques de
                      développement durables et responsables.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              A propos de moi
            </h2>
            <p className="text-[#111418] text-base font-normal leading-normal pb-3 pt-1 px-4">
              Étudiant en deuxième année de licence informatique à l’Université
              de La Rochelle, je suis passionné par les nouvelles technologies
              et l’innovation. J’aime relever des défis et mener mes projets
              avec rigueur et créativité. En parallèle, je me dépasse également
              sur la piste en compétition de demi-fond, où persévérance et
              performance sont mes maîtres-mots.
            </p>
            <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Education
            </h2>
            {about.education.map((item, index) => (
              <EducationListItem key={index} {...item} />
            ))}
            <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Skills
            </h2>
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              {about.skills.map((skill, index) => (
                <TagItem key={index} skill={skill} />
              ))}
            </div>
            <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Interests
            </h2>
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              {about.interests.map((interest, index) => (
                <TagItem key={index} skill={interest} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
