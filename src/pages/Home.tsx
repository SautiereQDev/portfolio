import { HeroSection } from "../components/HeroSection"
import { AnimatedSection } from "../components/ui/animated-section"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import Breadcrumb from "../components/ui/breadcrumb"
import SectionNavigation from "../components/ui/section-navigation"
import { ArrowRight, Code, Smartphone, Palette, Zap, Monitor, Database, Search, House, Star, Briefcase } from "lucide-react"
import { Link } from "@tanstack/react-router"
import homeBanner from "../assets/images/home_banner.svg"

export const Home = () => {
  const sections = [
    { id: "hero", title: "Accueil", icon: House },
    { id: "features", title: "Compétences", icon: Star },
    { id: "services", title: "Services", icon: Briefcase }
  ];

  const features = [
    {
      icon: Code,
      title: "Développement Web",
      description: "Applications web modernes et performantes avec les dernières technologies"
    },
    {
      icon: Smartphone,
      title: "Applications Mobile",
      description: "Applications natives et cross-platform pour iOS et Android"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Interfaces utilisateur intuitives et expériences utilisateur optimales"
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimisation et performance pour une expérience utilisateur fluide"
    }
  ]

  const services = [
    {
      icon: Monitor,
      title: "Site Web",
      description: "De la landing page au site complexe, je conçois une présence en ligne unique et sur mesure pour vous ou votre entreprise."
    },
    {
      icon: Smartphone,
      title: "Application Mobile",
      description: "Je développe des applications mobiles performantes et intuitives, adaptées à vos besoins sur iOS, Android ou en multiplateforme."
    },
    {
      icon: Database,
      title: "Base de données",
      description: "Je conçois et déploie des bases de données optimisées avec des outils performants pour une gestion efficace."
    },
    {
      icon: Search,
      title: "Optimisation SEO",
      description: "Améliorez votre visibilité en ligne avec une stratégie SEO efficace : mots-clés, optimisation on-page et plus encore."
    }
  ]
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
      <div id="hero">
        <HeroSection
          title="Salut, moi c'est Quentin !"
          subtitle="Développeur Full-Stack & Designer"
          description="Développeur Web full-stack avec plus de 5 ans d'expérience personnelle. Que vous ayez besoin d'un site web simple, d'une application web sur mesure ou d'une solution e-commerce complète, je suis là pour concrétiser vos idées."
          ctaText="Voir mes offres"
          ctaLink="/services"
          imageUrl={homeBanner}
        />
      </div>

      {/* Features Section */}
      <div id="features">
        <AnimatedSection className="py-24 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ce que je fais de mieux
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des solutions techniques modernes pour transformer vos idées en réalité digitale
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <AnimatedSection
                  key={feature.title}
                  animation="slideUp"
                  delay={index * 0.1}
                  className="h-full"
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}          </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Services Section */}
      <div id="services">
        <AnimatedSection className="py-24">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0">
                Services
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Mes offres de service
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des solutions adaptées à vos besoins, du site vitrine à l'application complexe
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {services.map((service, index) => (
                <AnimatedSection
                  key={service.title}
                  animation="slideUp"
                  delay={index * 0.1}
                  className="h-full"
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white group">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <Link to="/services" className="flex items-center gap-2">
                  Découvrir tous mes services
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>        </div>
        </AnimatedSection>
      </div>

      {/* CTA Section */}
      <AnimatedSection className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à donner vie à votre projet ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Discutons de votre projet et voyons comment je peux vous aider à atteindre vos objectifs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-50">
              <Link to="/contact">
                Contactez-moi
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link to="/projects">
                Voir mes réalisations
              </Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Home;
