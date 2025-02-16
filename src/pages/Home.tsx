import DesktopIcon from "../assets/icons/DesktopIcon.tsx";
import CodeIcon from "../assets/icons/CodeIcon.tsx";
import DatabaseIcon from "../assets/icons/DatabaseIcon.tsx";
import SearchIcon from "../assets/icons/SearchIcon.tsx";
import BillsIcon from "../assets/icons/BillsIcon.tsx";
import ServiceCard from "../components/Cards/ServiceCard.tsx";
import homeBanner from "../assets/images/home_banner.png";

export const Home = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden font-[Manrope]">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:px-4 @[480px]:py-3">
                <img
                  src={homeBanner}
                  className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-white @[480px]:rounded-xl min-h-[218px]"
                  alt="banner illustration"
                />
              </div>
            </div>
            <h1 className="text-[#111418] tracking-light text-[32px] font-bold leading-tight px-4 text-center pb-3 pt-6">
              Hi, I'm Quentin. I build websites and web applications.
            </h1>
            <p className="text-[#111418] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
              I'm a full-stack web developer with over 5 years of professional
              experience. I've worked with startups, large corporations, and
              everything in between. Whether you need a simple website, a custom
              web app, or a full e-commerce solution, I can help you bring your
              ideas to life.
            </p>
            <div className="flex px-4 py-3">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-[#1980e6] text-white text-base font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Get in touch</span>
              </button>
            </div>
            <h2 className="text-[#111418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Services
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <ServiceCard
                title={"Websites"}
                icon={<DesktopIcon />}
                description={
                  "From simple landing pages to complex multi-page sites, I can  create a unique online presence for you or your business."
                }
              />
              <ServiceCard
                title={"Web Applications"}
                icon={<CodeIcon />}
                description={
                  "Need a custom web application? No problem. I can build sophisticated front-end and back-end solutions tailored to your specific needs."
                }
              />
              <ServiceCard
                title={"Databases"}
                icon={<DatabaseIcon />}
                description={
                  "I'm experienced with database design and management. I can set up, optimize, and maintain databases for your web projects."
                }
              />
              <ServiceCard
                title={"SEO"}
                description={
                  "Want to improve your site's search engine ranking? I can help with keyword research, on-page optimization, and more."
                }
                icon={<SearchIcon />}
              />
              <ServiceCard
                title={"E-Commerce"}
                icon={<BillsIcon />}
                description={
                  "Whether you're selling physical or digital products, I can create an e-commerce site that's secure, user-friendly, andfully customizable."
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
