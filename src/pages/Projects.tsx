import { useState, useEffect } from "react";
import {
  Search,
  Code,
  Smartphone,
  Globe,
  Database,
  ArrowRight,
  Filter,
  TrendingUp,
} from "lucide-react";
import Seo from "../components/SEO";
import { ProjectCard } from "../components/cards/ProjectCard";
import { SectionHeader } from "../components/ui/section-header";
import { CTASection } from "../components/ui/cta-section";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { OptimizedImage } from "../components/ui/OptimizedImage";
import { useScrollAnimations } from "../hooks/useScrollAnimations";
import banner from "../assets/images/project_banner.svg";
import projects from "../data/projects.json";
import type { ProjectCategory, ProjectStats, Project } from "../types";

/**
 * Projects Page - Version finale avec architecture moderne et animations fiables
 */
export const Projects = () => {
  // State management
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Hook d'animations simples et fiables
  useScrollAnimations({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Fonction utilitaire pour obtenir la classe de délai
  const getDelayClass = (index: number): string => {
    const delays = [
      "delay-100",
      "delay-200",
      "delay-300",
      "delay-400",
      "delay-500",
    ];
    return delays[Math.min(index, delays.length - 1)];
  };

  // Configuration data
  const categories: ProjectCategory[] = [
    {
      id: "all",
      name: "Tous",
      icon: Globe,
      count: projects.length,
      description: "Tous les projets",
    },
    {
      id: "web",
      name: "Web",
      icon: Code,
      count: projects.filter((p) =>
        p.technos.some((t) => ["React", "Vue", "Nuxt", "Symfony"].includes(t))
      ).length,
      description: "Applications web modernes",
    },
    {
      id: "mobile",
      name: "Mobile",
      icon: Smartphone,
      count: projects.filter((p) =>
        p.technos.some((t) => ["React Native", "Expo"].includes(t))
      ).length,
      description: "Applications mobiles",
    },
    {
      id: "api",
      name: "API",
      icon: Database,
      count: projects.filter((p) =>
        p.technos.some((t) => ["NestJs", "API Platform", "PHP"].includes(t))
      ).length,
      description: "APIs et services backend",
    },
    {
      id: "divers",
      name: "Divers",
      icon: TrendingUp,
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
            ].includes(t)
          )
      ).length,
      description: "Projets divers et expérimentaux",
    },
  ];

  const stats: ProjectStats[] = [
    {
      value: projects.length,
      label: "Projets réalisés",
      color: "text-blue-600",
    },
    {
      value: 20,
      label: "Technologies maîtrisées",
      color: "text-purple-600",
    },
    {
      value: 5,
      label: "Années d'expérience",
      color: "text-green-600",
    },
    {
      value: 2,
      label: "Années d'études",
      color: "text-orange-600",
    },
  ];

  // Helper functions for filtering
  const filterByCategory = (
    projectList: Project[],
    category: string
  ): Project[] => {
    if (category === "all") return projectList;

    const categoryTechnos = {
      web: ["React", "Vue", "Nuxt", "Symfony", "Tailwindcss"],
      mobile: ["React Native", "Expo"],
      api: ["NestJs", "API Platform", "PHP", "NodeJs"],
    };

    if (category === "divers") {
      const allOtherTechnos = [
        ...categoryTechnos.web,
        ...categoryTechnos.mobile,
        ...categoryTechnos.api,
      ];
      return projectList.filter(
        (project: Project) =>
          !project.technos.some((tech: string) =>
            allOtherTechnos.includes(tech)
          )
      );
    }

    const techs = categoryTechnos[category as keyof typeof categoryTechnos];
    return projectList.filter((project: Project) =>
      project.technos.some((tech: string) => techs?.includes(tech))
    );
  };

  const filterBySearch = (projectList: Project[], term: string): Project[] => {
    if (!term) return projectList;

    const lowerTerm = term.toLowerCase();
    return projectList.filter(
      (project: Project) =>
        project.title.toLowerCase().includes(lowerTerm) ||
        project.description.toLowerCase().includes(lowerTerm) ||
        project.technos.some((tech: string) =>
          tech.toLowerCase().includes(lowerTerm)
        )
    );
  };

  const getProjectCountText = () => {
    const count = filteredProjects.length;
    const plural = count > 1 ? "s" : "";
    const baseText = `${count} projet${plural} trouvé${plural}`;
    const searchText = searchTerm ? ` pour "${searchTerm}"` : "";
    return baseText + searchText;
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchTerm("");
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchTerm("");
  };

  // Filter logic
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      let filtered = filterByCategory(projects, selectedCategory);
      filtered = filterBySearch(filtered, searchTerm);

      setFilteredProjects(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-white font-[Manrope]">
      <Seo page="projects" />
      {/* Hero Section - Animations CSS fiables */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
        <div className="relative z-10 container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="hero-title mb-8">
              <OptimizedImage
                src={banner}
                alt="Mes projets"
                className="mx-auto mb-8 w-64 drop-shadow-2xl"
              />
            </div>
            <h1 className="hero-subtitle mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl leading-tight font-bold text-transparent md:text-6xl">
              Mes Réalisations
            </h1>
            <p className="hero-description mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl">
              Découvrez une sélection de mes projets, des applications web
              modernes aux solutions mobiles innovantes. Chaque projet témoigne
              de ma passion pour la création de solutions numériques
              performantes.
            </p>
          </div>
        </div>
      </div>
      {/* Stats Section */}
      <div className="bg-gray-50 py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="animate-on-scroll">
              <SectionHeader
                badge={{
                  text: "Statistiques",
                }}
                title="Quelques chiffres"
                description="Un aperçu de mon parcours et de mon expérience"
                layout="centered"
              />
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={
                    index > 0
                      ? `stat-card h-full delay-${index}00`
                      : "stat-card h-full"
                  }
                >
                  <Card className="border-0 bg-white text-center shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                    <CardContent className="p-6">
                      <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                        {stat.value}
                      </div>
                      <CardDescription className="font-medium text-gray-600">
                        {stat.label}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Filters Section */}
      <div className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="animate-on-scroll">
              <SectionHeader
                badge={{
                  text: "Filtres",
                }}
                title="Explorer mes projets"
                description="Trouvez rapidement les projets qui vous intéressent"
                layout="centered"
              />
            </div>{" "}
            <div className="space-y-8">
              {/* Search Bar - Simplifié */}
              <div className="animate-on-scroll">
                <div className="relative">
                  {/* Icône de recherche simplifiée */}
                  <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  {/* Input simplifié */}
                  <input
                    type="text"
                    placeholder="Rechercher un projet, une technologie..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white py-4 pr-6 pl-12 text-lg placeholder-gray-400 transition-all duration-300 hover:border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
                  />

                  {/* Indicateur de résultats */}
                  {searchTerm && (
                    <div className="absolute top-1/2 right-4 flex -translate-y-1/2 items-center gap-3">
                      <div className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
                        {filteredProjects.length} résultat
                        {filteredProjects.length > 1 ? "s" : ""}
                      </div>
                      <button
                        onClick={() => setSearchTerm("")}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 transition-colors duration-200 hover:bg-gray-300"
                        title="Effacer la recherche"
                      >
                        <span className="text-sm text-gray-500">✕</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {/* Category Filters */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {categories.map((category, index) => (
                  <div
                    key={category.id}
                    className={`filter-card h-full ${index > 0 ? getDelayClass(index) : ""}`}
                  >
                    <Card
                      className={`group h-full cursor-pointer border-0 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                        selectedCategory === category.id
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-white hover:bg-gray-50"
                      }`}
                      onClick={() => handleCategoryChange(category.id)}
                    >
                      <CardContent className="flex h-full flex-col justify-between p-4 text-center">
                        <div className="mb-3 flex justify-center">
                          <div
                            className={`flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${
                              selectedCategory === category.id
                                ? "bg-white/20"
                                : "bg-gradient-to-r from-blue-100 to-purple-100"
                            }`}
                          >
                            <category.icon
                              className={`h-6 w-6 ${
                                selectedCategory === category.id
                                  ? "text-white"
                                  : "text-blue-600"
                              }`}
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <CardTitle
                            className={`mb-1 text-lg font-bold ${
                              selectedCategory === category.id
                                ? "text-white"
                                : "text-gray-900"
                            }`}
                          >
                            {category.name}
                          </CardTitle>
                          <CardDescription
                            className={`mb-2 text-sm ${
                              selectedCategory === category.id
                                ? "text-white/80"
                                : "text-gray-600"
                            }`}
                          >
                            {category.description}
                          </CardDescription>{" "}
                        </div>
                        <div className="mt-2">
                          <Badge
                            className={`inline-flex h-6 min-w-[2rem] items-center justify-center rounded-full px-2 py-1 text-xs font-bold transition-all duration-300 ${
                              selectedCategory === category.id
                                ? "bg-white/90 text-blue-600 shadow-sm"
                                : "border border-blue-200 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700"
                            } `}
                          >
                            {category.count}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* Projects Grid Section */}
      <div className="projects-section relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 py-24">
        {/* Glassmorphisme background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5" />
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-purple-400/10 blur-3xl" />

        <div className="relative container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="animate-on-scroll">
              <SectionHeader
                badge={{
                  text: "Portfolio",
                }}
                title={
                  selectedCategory === "all"
                    ? "Tous mes projets"
                    : `Projets ${categories.find((c) => c.id === selectedCategory)?.name}`
                }
                description={getProjectCountText()}
                layout="centered"
                showSeparator
              />
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="grid gap-8 lg:grid-cols-2">
                {filteredProjects.map((project, index) => (
                  <div
                    key={`${project.title}-${selectedCategory}-${searchTerm}`}
                    className={`project-card`}
                    style={{ animationDelay: `${index * 0.1}s` }}
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
              <div className="animate-on-scroll">
                <Card className="border-0 bg-white shadow-lg">
                  <CardContent className="py-24 text-center">
                    <div className="mb-6 text-6xl">🔍</div>
                    <CardTitle className="mb-4 text-2xl font-bold text-gray-900">
                      Aucun projet trouvé
                    </CardTitle>
                    <CardDescription className="mb-6 text-lg text-gray-600">
                      Essayez de modifier vos critères de recherche ou de
                      filtrage
                    </CardDescription>
                    <Button
                      onClick={resetFilters}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      Réinitialiser les filtres
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <CTASection
        title="Un projet en tête ?"
        description="Discutons de votre projet et voyons comment je peux vous aider à concrétiser vos idées"
        primaryCta={{
          text: "Me contacter",
          href: "/contact",
        }}
        secondaryCta={{
          text: "Voir mes services",
          href: "/services",
          icon: <ArrowRight className="h-4 w-4" />,
        }}
        badge={{
          text: "Contact",
          icon: <ArrowRight className="h-3 w-3" />,
        }}
        variant="gradient"
      />
    </div>
  );
};

export default Projects;
