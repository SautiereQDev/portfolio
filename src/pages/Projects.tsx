import { useState, useEffect, useRef, useCallback } from "react";
import { ProjectCard } from "../components/cards/ProjectCard.tsx";
import { AnimatedSection } from "../components/ui/animated-section";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import Breadcrumb from "../components/ui/breadcrumb";
import SectionNavigation from "../components/ui/section-navigation";
import {
  Search,
  Code,
  Smartphone,
  Globe,
  Database,
  FolderOpen,
  Filter,
  Grid,
} from "lucide-react";
import { gsap } from "gsap";
import banner from "../assets/images/project_banner.svg";
import projects from "../data/projects.json";

export const Projects = () => {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: "intro", title: "Introduction", icon: FolderOpen },
    { id: "filters", title: "Filtres", icon: Filter },
    { id: "projects", title: "Projets", icon: Grid },
  ];
  const categories = [
    { id: "all", name: "Tous", icon: Globe, count: projects.length },
    {
      id: "web",
      name: "Web",
      icon: Code,
      count: projects.filter((p) =>
        p.technos.some((t) => ["React", "Vue", "Nuxt", "Symfony"].includes(t)),
      ).length,
    },
    {
      id: "mobile",
      name: "Mobile",
      icon: Smartphone,
      count: projects.filter((p) =>
        p.technos.some((t) => ["React Native", "Expo"].includes(t)),
      ).length,
    },
    {
      id: "api",
      name: "API",
      icon: Database,
      count: projects.filter((p) =>
        p.technos.some((t) => ["NestJs", "API Platform", "PHP"].includes(t)),
      ).length,
    },
    {
      id: "divers",
      name: "Divers",
      icon: FolderOpen,
      count: projects.filter(
        (p) =>
          !p.technos.some((t) =>
            [
              "React",
              "Vue",
              "Nuxt",
              "Symfony",
              "React Native",
              "Expo",
              "NestJs",
              "API Platform",
              "PHP",
            ].includes(t),
          ),
      ).length,
    },
  ];

  // Fonction pour changer de catégorie et réinitialiser la recherche
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchTerm(""); // Réinitialise la barre de recherche
  }; // Fonction séparée pour animer un compteur (extraite pour réduire la nesting)
  const animateCounter = useCallback((counter: Element, isMobile: boolean) => {
    const target = parseInt(counter.getAttribute("data-count") ?? "0");
    gsap.to(counter, {
      innerHTML: target,
      duration: isMobile ? 1.2 : 2,
      ease: "power2.out",
      snap: { innerHTML: 1 },
    });
  }, []);

  // Fonction pour animer tous les compteurs d'un élément
  const animateCountersInElement = useCallback(
    (element: Element, isMobile: boolean) => {
      const counters = element.querySelectorAll("[data-count]");
      counters.forEach((counter) => animateCounter(counter, isMobile));
    },
    [animateCounter],
  );

  // Fonction pour gérer l'intersection avec les statistiques
  const handleStatsIntersection = useCallback(
    (entries: IntersectionObserverEntry[], isMobile: boolean) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCountersInElement(entry.target, isMobile);
        }
      });
    },
    [animateCountersInElement],
  );

  useEffect(() => {
    // Détection mobile pour ajuster les animations
    const isMobile = window.innerWidth < 768;
    const animationDuration = isMobile ? 0.4 : 0.8;
    let tl: gsap.core.Timeline | null = null;

    // Animation d'entrée du hero déclenchée par le scroll
    if (heroRef.current) {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%", // Démarre quand la section est visible à 80%
          end: "top 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Initialiser les éléments cachés
      gsap.set(
        [".hero-image", ".hero-badge", ".hero-title", ".hero-description"],
        {
          autoAlpha: 0,
          y: isMobile ? 20 : 30,
        },
      );
      gsap.set(".hero-image", {
        scale: 0.9,
      });

      // Animation séquentielle optimisée pour mobile
      tl.to(".hero-image", {
        scale: 1,
        autoAlpha: 1,
        duration: animationDuration,
        ease: "power2.out",
      })
        .to(
          ".hero-badge",
          {
            y: 0,
            autoAlpha: 1,
            duration: animationDuration * 0.8,
            ease: "power2.out",
          },
          `-=${animationDuration * 0.6}`,
        )
        .to(
          ".hero-title",
          {
            y: 0,
            autoAlpha: 1,
            duration: animationDuration,
            ease: "power2.out",
          },
          `-=${animationDuration * 0.5}`,
        )
        .to(
          ".hero-description",
          {
            y: 0,
            autoAlpha: 1,
            duration: animationDuration * 0.8,
            ease: "power2.out",
          },
          `-=${animationDuration * 0.4}`,
        );
    }

    // Animation des statistiques avec durée réduite sur mobile
    let observer: IntersectionObserver | null = null;
    if (statsRef.current) {
      observer = new IntersectionObserver(
        (entries) => handleStatsIntersection(entries, isMobile),
        { threshold: isMobile ? 0.3 : 0.5 },
      );

      observer.observe(statsRef.current);
    }

    // Nettoyage des animations
    return () => {
      if (tl) tl.kill();
      if (observer) observer.disconnect();
    };
  }, [handleStatsIntersection]);

  useEffect(() => {
    let filtered = projects;

    // Filtrage par catégorie
    if (selectedCategory !== "all") {
      const categoryTechnos = {
        web: ["React", "Vue", "Nuxt", "Symfony", "Tailwindcss"],
        mobile: ["React Native", "Expo"],
        api: ["NestJs", "API Platform", "PHP", "NodeJs"],
      };

      if (selectedCategory === "divers") {
        // Pour la catégorie "divers", on filtre les projets qui n'ont AUCUNE des technologies des autres catégories
        const allOtherTechnos = [
          ...categoryTechnos.web,
          ...categoryTechnos.mobile,
          ...categoryTechnos.api,
        ];

        filtered = filtered.filter(
          (project) =>
            !project.technos.some((tech) => allOtherTechnos.includes(tech)),
        );
      } else {
        filtered = filtered.filter((project) =>
          project.technos.some((tech) =>
            categoryTechnos[
              selectedCategory as keyof typeof categoryTechnos
            ]?.includes(tech),
          ),
        );
      }
    }

    // Filtrage par recherche
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          project.technos.some((tech) =>
            tech.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    setFilteredProjects(filtered);
  }, [selectedCategory, searchTerm]);
  return (
    <div className="min-h-screen bg-white font-[Manrope]">
      {/* Navigation par sections */}
      <SectionNavigation sections={sections} />
      {/* Breadcrumb */}
      <div className="pt-4 pb-4">
        <div className="container mx-auto px-4">
          <Breadcrumb />
        </div>
      </div>
      {/* Hero Section */}
      <div id="intro">
        <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.3)_1px,transparent_0)] bg-[length:25px_25px] sm:bg-[length:35px_35px] lg:bg-[length:50px_50px]"></div>
          </div>
          <div
            ref={heroRef}
            className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          >
            <div className="text-center space-y-6 lg:space-y-8">
              <div className="relative inline-block hero-image">
                <img
                  src={banner}
                  alt="Projets illustration"
                  className="w-48 sm:w-56 lg:w-64 h-auto mx-auto"
                />
                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-24 h-24 sm:w-32 sm:h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-24 h-24 sm:w-32 sm:h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              </div>
              <div className="space-y-3 lg:space-y-4">
                <Badge className="hero-badge bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0">
                  Portfolio
                </Badge>
                <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Mes Projets
                </h1>
                <p className="hero-description text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Découvrez une sélection de mes réalisations, des applications
                  web modernes aux solutions mobiles innovantes
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Statistiques */}
      <AnimatedSection className="py-12 lg:py-16 bg-gray-50">
        <div ref={statsRef} className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 text-center">
            <div className="space-y-1 lg:space-y-2">
              <div
                className="text-2xl sm:text-3xl font-bold text-blue-600"
                data-count={projects.length}
              >
                0
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                Projets réalisés
              </div>
            </div>
            <div className="space-y-1 lg:space-y-2">
              <div
                className="text-2xl sm:text-3xl font-bold text-purple-600"
                data-count="20"
              >
                0
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                Technologies maîtrisées
              </div>
            </div>
            <div className="space-y-1 lg:space-y-2">
              <div
                className="text-2xl sm:text-3xl font-bold text-green-600"
                data-count="5"
              >
                0
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                Années d&apos;expérience
              </div>
            </div>
            <div className="space-y-1 lg:space-y-2">
              <div
                className="text-2xl sm:text-3xl font-bold text-orange-600"
                data-count="2"
              >

                0
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                Années d&apos;études
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      {/* Filtres et Recherche */}
      <div id="filters">
        <AnimatedSection className="py-8 lg:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6 lg:space-y-8">
              {/* Barre de recherche */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Rechercher un projet..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                />
              </div>
              {/* Filtres par catégorie */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    variant={
                      selectedCategory === category.id ? "default" : "outline"
                    }
                    className={`flex items-center gap-1.5 sm:gap-2 transition-all duration-300 text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2.5 ${selectedCategory === category.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                      : "hover:border-blue-300"
                      }`}
                  >
                    <category.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{category.name}</span>
                    <span className="sm:hidden">
                      {category.name.slice(0, 3)}
                    </span>
                    <Badge
                      variant="secondary"
                      className="ml-0.5 sm:ml-1 text-xs px-1.5 py-0.5"
                    >
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
      {/* Grille des projets */}
      <div id="projects">
        <AnimatedSection className="py-8 lg:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {filteredProjects.length > 0 ? (
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 projects-grid">
                {filteredProjects.map((project, index) => (
                  <div
                    key={`${project.title}-${index}`}
                    className="project-card"
                    style={{ animationDelay: `${index * 0.1 + 0.1}s` }}
                  >
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      imageUrl={project.imageUrl}
                      visit_link={project.visit_link}
                      github_link={project.github_link}
                      key_points={project.key_points}
                      technos={project.technos}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 animate-fade-in">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Aucun projet trouvé
                </h3>
                <p className="text-gray-500">
                  Essayez de modifier vos critères de recherche ou de filtrage
                </p>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Projects;
