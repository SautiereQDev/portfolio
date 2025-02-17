import banner from "../assets/images/services_banner.webp";
import serviceDetails from "../data/servicesDetails.json";
import ServiceDescriptionItem from "../components/items/ServiceDescriptionItem.tsx";
import { Link } from "@tanstack/react-router";
import rocket from "../assets/icons/rocket.svg";
import check from "../assets/icons/check.svg";
import fileCode from "../assets/icons/file-code.svg";
import calendar from "../assets/icons/calendar.svg";
import fileDoc from "../assets/icons/file-doc.svg";
import wrench from "../assets/icons/wrench.svg";
import search from "../assets/icons/search.svg";

export const Service = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden font-[Manrope]">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:px-4 @[480px]:py-3">
                <img
                  className="object-cover mx-auto max-w-md w-full"
                  src={banner}
                  alt="header banner"
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">
                Développement Web
              </p>
            </div>
            <p className="text-[#111418] text-base font-normal leading-normal pb-3 pt-1 px-4">
              Je suis spécialisé dans le développement Web full-stack, qui
              comprend à la fois le travail front-end et back-end. Je peux vous
              aider avec tout, des simples pages de destination aux applications
              Web complexes. Que vous ayez besoin d&#39;un nouveau site Web,
              d&#39;une refonte ou d&#39;une nouvelle fonctionnalité ajoutée à
              un site existant, je peux vous aider à donner vie à votre vision.
            </p>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(228px,1fr))] gap-2.5 px-4 py-3 @3xl:grid-cols-4">
              <div className="flex flex-1 flex-col gap-4 rounded-xl border border-solid border-[#dce0e5] bg-white p-6">
                <div className="flex flex-col gap-1 mb-2">
                  <h1 className="text-[#111418] text-base font-bold leading-tight">
                    Site vitrine
                  </h1>
                  <p className="flex items-baseline gap-1 text-[#111418]">
                    <span className="text-[#111418] text-4xl font-black leading-tight tracking-[-0.033em]">
                      1 000€
                    </span>
                    <span className="text-[#111418] text-base font-bold leading-tight">
                      /site
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  {serviceDetails.simple.map((description) => (
                    <ServiceDescriptionItem
                      key={description}
                      description={description}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 rounded-xl border border-solid border-[#dce0e5] bg-white p-6">
                <div className="flex flex-col gap-1 mb-2">
                  <h1 className="text-[#111418] text-base font-bold leading-tight">
                    Site web complexe
                  </h1>
                  <p className="flex items-baseline gap-1 text-[#111418]">
                    <span className="text-[#111418] text-4xl font-black leading-tight tracking-[-0.033em]">
                      + 2 000€
                    </span>
                    <span className="text-[#111418] text-base font-bold leading-tight">
                      /site
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  {serviceDetails.complex.map((description) => (
                    <ServiceDescriptionItem
                      key={description}
                      description={description}
                    />
                  ))}
                </div>
              </div>
            </div>
            <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Comment ça marche
            </h3>
            <div className="grid grid-cols-[40px_1fr] gap-x-2 px-4">
              <div className="flex flex-col items-center gap-1 pt-4">
                <img
                  src={calendar}
                  alt="calendar icon"
                  height={24}
                  width={24}
                />
                <div className="w-[1.5px] bg-[#dce0e5] h-2 grow"></div>
              </div>
              <div className="flex flex-1 flex-col py-3">
                <p className="text-[#111418] text-base font-medium leading-normal">
                  Consultation initiale
                </p>
                <p className="text-[#637588] text-base font-normal leading-normal">
                  30 minutes
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-[1.5px] bg-[#dce0e5] h-2"></div>
                <img src={fileDoc} alt="fileDoc icon" height={24} width={24} />
                <div className="w-[1.5px] bg-[#dce0e5] h-2 grow"></div>
              </div>
              <div className="flex flex-1 flex-col py-3">
                <p className="text-[#111418] text-base font-medium leading-normal">
                  Proposition du projet
                </p>
                <p className="text-[#637588] text-base font-normal leading-normal">
                  1 à 2 semaines
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-[1.5px] bg-[#dce0e5] h-2"></div>
                <img
                  src={fileCode}
                  alt="fileCode icon"
                  height={24}
                  width={24}
                />
                <div className="w-[1.5px] bg-[#dce0e5] h-2 grow"></div>
              </div>
              <div className="flex flex-1 flex-col py-3">
                <p className="text-[#111418] text-base font-medium leading-normal">
                  Développement
                </p>
                <p className="text-[#637588] text-base font-normal leading-normal">
                  Varie en fonction de la complexité du project
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-[1.5px] bg-[#dce0e5] h-2"></div>
                <img src={check} alt="check icon" />
                <div className="w-[1.5px] bg-[#dce0e5] h-2 grow"></div>
              </div>
              <div className="flex flex-1 flex-col py-3">
                <p className="text-[#111418] text-base font-medium leading-normal">
                  Revision finale
                </p>
                <p className="text-[#637588] text-base font-normal leading-normal">
                  1 semaine
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-[1.5px] bg-[#dce0e5] h-2"></div>
                <img src={rocket} alt="rocket icon" height={24} width={24} />
              </div>
              <div className="flex flex-1 flex-col py-3">
                <p className="text-[#111418] text-base font-medium leading-normal">
                  Lancement du site
                </p>
              </div>
            </div>
            <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Additional information
            </h3>
            <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
              <div
                className="text-[#111418] flex items-center justify-center rounded-lg bg-[#f0f2f4] shrink-0 size-12"
                data-icon="Wrench"
                data-size="24px"
                data-weight="regular"
              >
                <img src={wrench} alt="wrench icon" height={24} width={24} />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[#111418] text-base font-medium leading-normal line-clamp-1">
                  Maintenance &amp; support
                </p>
                <p className="text-[#637588] text-sm font-normal leading-normal line-clamp-2">
                  J&#39;assure la maintenance et le support de votre site 1 an
                  après la livraison, le service est renouvelable.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2">
              <div
                className="text-[#111418] flex items-center justify-center rounded-lg bg-[#f0f2f4] shrink-0 size-12"
                data-icon="MagnifyingGlass"
                data-size="24px"
                data-weight="regular"
              >
                <img src={search} alt="search icon" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[#111418] text-base font-medium leading-normal line-clamp-1">
                  Consulting
                </p>
                <p className="text-[#637588] text-sm font-normal leading-normal line-clamp-2">
                  Si vous n&#39;êtes pas sûr du type de site dont vous avez
                  besoin, je peux également vous aider à le déterminer.
                </p>
              </div>
            </div>
            <div className="flex px-4 py-3 justify-end">
              <Link
                to="/contact"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#1980e6] text-white text-sm font-bold leading-normal tracking-[0.015em]"
              >
                <span className="truncate">Commencer</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
