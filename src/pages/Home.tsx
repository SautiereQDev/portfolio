import homeBanner from "../assets/images/home_banner.svg";
import services from "../data/services.json";
import { Link } from "@tanstack/react-router";
import ServiceCard from "../components/cards/ServiceCard.tsx";

export const Home = () => {
  return (
    <main className="relative min-h-screen bg-white group/design-root overflow-x-hidden font-[Manrope]">
      <header className="layout-container px-40 py-5">
        <div className="layout-content-container mx-auto max-w-[980px]">
          <div className="@container">
            <div className="@[480px]:px-4 @[480px]:py-3">
              <img
                src={homeBanner}
                className="object-cover mb-6 mx-auto max-w-sm w-full"
                alt="banner illustration"
              />
            </div>
          </div>
          <h1 className="text-[#111418] tracking-light text-[32px] font-bold leading-tight text-center pb-4 pt-6">
            Salut, moi c&apos;est Quentin ! Je suis développeur et je conçois
            des sites web ainsi que des applications mobiles.
          </h1>
          <p className="text-[#111418] text-base font-normal leading-normal pb-3 pt-1 text-center">
            Développeur Web full-stack avec plus de 5 ans d&apos;expérience
            personnelle. Que vous ayez besoin d&apos;un site web simple,
            d&apos;une application web sur mesure ou d&apos;une solution
            e-commerce complète, je suis là pour concrétiser vos idées. Je
            propose également le développement d&apos;applications mobiles.
          </p>
          <nav className="flex px-4 py-8">
            <Link
              className="flex min-w-[84px] max-w-[320px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-[#1980e6] text-white text-base font-bold leading-normal tracking-[0.015em] mx-auto shadow-md hover:bg-[#1873d1] focus:outline-none focus:ring-2 focus:ring-[#1980e6] focus:ring-offset-2 transition-colors"
              to="/services"
            >
              <span className="truncate">Voir mes offres</span>
            </Link>
          </nav>
        </div>
      </header>
      <section className="layout-content-container mx-auto max-w-[980px] pb-8">
        <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Services
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-expect-error */}
          {services.map((service: ServiceCardProps) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
