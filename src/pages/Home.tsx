import { HeroSection } from "../components/HeroSection";
import { AnimatedSection } from "../components/ui/animated-section";
import Seo from "../components/SEO";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  ArrowRight,
  Code,
  Smartphone,
  Palette,
  Zap,
  Monitor,
  Database,
  Search,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Home = () => {
  const features = [
    {
      icon: Code,
      title: "Développement Web",
      description:
        "Applications web modernes et performantes avec les dernières technologies",
    },
    {
      icon: Smartphone,
      title: "Applications Mobile",
      description: "Applications natives et cross-platform pour iOS et Android",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "Interfaces utilisateur intuitives et expériences utilisateur optimales",
    },
    {
      icon: Zap,
      title: "Performance",
      description:
        "Optimisation et performance pour une expérience utilisateur fluide",
    },
  ];

  const services = [
    {
      icon: Monitor,
      title: "Site Web",
      description:
        "De la landing page au site complexe, je conçois une présence en ligne unique et sur mesure pour vous ou votre entreprise.",
    },
    {
      icon: Smartphone,
      title: "Application Mobile",
      description:
        "Je développe des applications mobiles performantes et intuitives, adaptées à vos besoins sur iOS, Android ou en multiplateforme.",
    },
    {
      icon: Database,
      title: "Base de données",
      description:
        "Je conçois et déploie des bases de données optimisées avec des outils performants pour une gestion efficace.",
    },
    {
      icon: Search,
      title: "Optimisation SEO",
      description:
        "Améliorez votre visibilité en ligne avec une stratégie SEO efficace : mots-clés, optimisation on-page et plus encore.",
    },
  ];
  return (
    <div className="min-h-screen bg-white font-[Manrope]">
      <Seo page="home" />

      {/* Hero Section */}
      <div id="hero">
        <HeroSection
          title="Salut, moi c'est Quentin&nbsp;!" // espace insécable pour éviter la coupure du nom
          subtitle="Développeur Full-Stack & Designer"
          description="Développeur Web full-stack avec plus de 5 ans d'expérience personnelle. Que vous ayez besoin d'un site web simple, d'une application web sur mesure ou d'une solution e-commerce complète, je suis là pour concrétiser vos idées."
          ctaText="Voir mes offres"
          ctaLink="/services"
          illustrationName="home"
        />
      </div>

      {/* Features Section */}
      <div id="features">
        <AnimatedSection className="bg-gray-50 py-24">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Ce que je fais de mieux
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-600">
                Des solutions techniques modernes pour transformer vos idées en
                réalité digitale
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <AnimatedSection
                  key={feature.title}
                  animation="slideUp"
                  delay={index * 0.1}
                  className="h-full"
                >
                  <Card className="group h-full border-0 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                    <CardHeader className="pb-4 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 transition-transform duration-300 group-hover:scale-110">
                        <feature.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="leading-relaxed text-gray-600">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Services Section */}
      <div id="services">
        <AnimatedSection className="py-24">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="mb-16 text-center">
              <Badge className="mb-4 border-0 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                Services
              </Badge>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Les services que je propose
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-gray-600">
                Des solutions adaptées à vos besoins, du site vitrine à
                l&apos;application complexe
              </p>
            </div>
            <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {services.map((service, index) => (
                <AnimatedSection
                  key={service.title}
                  animation="slideUp"
                  delay={index * 0.1}
                  className="h-full"
                >
                  <Card className="group h-full border-0 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                    <CardHeader className="pb-4 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 transition-transform duration-300 group-hover:scale-110">
                        <service.icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="leading-relaxed text-gray-600">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
            <div className="text-center">
              <Button
                asChild
                size="lg"
                className="group relative transform overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
              >
                <Link
                  to="/services"
                  className="flex items-center gap-2 px-8 py-4"
                >
                  <span className="relative z-10">
                    Découvrir tous mes services
                  </span>
                  <ArrowRight className="relative z-10 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* CTA Section */}
      <AnimatedSection className="bg-gradient-to-r from-blue-600 to-purple-600 py-24">
        <div className="container mx-auto px-6 text-center lg:px-8">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Prêt à donner vie à votre projet ?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
            Discutons de votre projet et voyons comment je peux vous aider à
            atteindre vos objectifs
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-50"
            >
              <Link to="/contact">Contactez-moi</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Link to="/projects">Voir mes réalisations</Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Home;
