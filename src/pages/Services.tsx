import { Link } from "@tanstack/react-router";
import {
  Code,
  Globe,
  Database,
  Search,
  Wrench,
  Calendar,
  FileText,
  Rocket,
  Check,
  Star,
  ArrowRight,
} from "lucide-react";
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
import { OptimizedImage } from "../components/ui/OptimizedImage";
import { useScrollAnimations } from "../hooks/useScrollAnimations";
import banner from "../assets/images/services_banner.svg";
import serviceDetails from "../data/servicesDetails.json";

// Data structures for better maintainability
const processSteps = [
  {
    icon: Calendar,
    title: "Consultation initiale",
    duration: "30 minutes",
    description: "Analyse de vos besoins et définition du projet",
  },
  {
    icon: FileText,
    title: "Proposition du projet",
    duration: "1 à 2 semaines",
    description: "Cahier des charges détaillé et devis personnalisé",
  },
  {
    icon: Code,
    title: "Développement",
    duration: "Variable selon complexité",
    description: "Création de votre solution sur mesure",
  },
  {
    icon: Check,
    title: "Révision finale",
    duration: "1 semaine",
    description: "Tests et ajustements selon vos retours",
  },
  {
    icon: Rocket,
    title: "Lancement du site",
    duration: "Instantané",
    description: "Mise en ligne et formation à l'utilisation",
  },
];

const additionalServices = [
  {
    icon: Wrench,
    title: "Maintenance & support",
    description:
      "J'assure la maintenance et le support de votre site 1 an après la livraison, le service est renouvelable.",
  },
  {
    icon: Search,
    title: "Consulting",
    description:
      "Si vous n'êtes pas sûr du type de site dont vous avez besoin, je peux également vous aider à le déterminer.",
  },
];

/**
 * Services Page - Version refactorisée avec animations CSS fiables
 */
export const Service = () => {
  // Hook d'animations simples et fiables
  useScrollAnimations({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div className="min-h-screen bg-white font-[Manrope]">
      <Seo page="services" />

      {/* Hero Section - Animations CSS fiables */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
        <div className="relative z-10 container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="hero-title mb-8">
              <OptimizedImage
                src={banner}
                alt="Services"
                className="mx-auto mb-8 w-64 drop-shadow-2xl"
              />
            </div>
            <h1 className="hero-subtitle mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl leading-tight font-bold text-transparent md:text-6xl">
              Développement Web
            </h1>
            <p className="hero-description mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl">
              Je suis spécialisé dans le développement Web full-stack, qui
              comprend à la fois le travail front-end et back-end. Je peux vous
              aider à toutes les échelles, du simple site vitrine à une
              applications Web complexe.
            </p>
          </div>
        </div>
      </div>

      {/* Services Pricing Section - Enhanced design */}
      <div id="services" className="services-section bg-gray-50 py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="animate-on-scroll mb-16 text-center">
              <Badge className="mb-4 border-0 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                Offres
              </Badge>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Mes Services
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-gray-600">
                Des solutions adaptées à vos besoins et votre budget
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:mx-auto lg:max-w-5xl">
              {/* Site Vitrine - Enhanced card */}
              <div className="animate-on-scroll service-card h-full">
                <Card className="group h-full border-0 bg-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                  <CardHeader className="pb-6 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 transition-transform duration-300 group-hover:scale-110">
                      <Globe className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="mb-2 text-2xl font-bold text-gray-900">
                      Site Vitrine
                    </CardTitle>
                    <div className="text-center">
                      <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-4xl font-bold text-transparent">
                        700€
                      </span>
                      <span className="text-lg text-gray-600">/site</span>
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="space-y-4">
                      {serviceDetails.simple.map((feature, index) => (
                        <div
                          key={feature + index}
                          className="flex items-start gap-3"
                        >
                          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <CardDescription className="leading-relaxed text-gray-700">
                            {feature}
                          </CardDescription>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Site Complexe - Enhanced card with popular badge */}
              <div className="animate-on-scroll service-card h-full delay-200">
                <Card className="group relative h-full border-0 bg-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg">
                      <Star className="mr-1 h-3 w-3" />
                      Populaire
                    </Badge>
                  </div>
                  <CardHeader className="pt-8 pb-6 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 transition-transform duration-300 group-hover:scale-110">
                      <Database className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="mb-2 text-2xl font-bold text-gray-900">
                      Site Complexe
                    </CardTitle>
                    <div className="text-center">
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">
                        1500€
                      </span>
                      <span className="text-lg text-gray-600">/site</span>
                    </div>
                    <div className="mt-2">
                      <CardDescription className="font-medium text-gray-600">
                        Idéal pour les entreprises
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="px-6 pb-6">
                    <div className="space-y-4">
                      {serviceDetails.complex.map((feature, index) => (
                        <div
                          key={feature + index}
                          className="flex items-start gap-3"
                        >
                          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <CardDescription className="leading-relaxed text-gray-700">
                            {feature}
                          </CardDescription>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section - Enhanced timeline */}
      <div id="process" className="process-section bg-white py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="animate-on-scroll mb-16 text-center">
              <Badge className="mb-4 border-0 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800">
                Processus
              </Badge>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Comment ça marche
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-gray-600">
                Un processus éprouvé pour votre réussite
              </p>
            </div>

            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <div
                  key={step.title + index}
                  className={`process-step animate-on-scroll delay-${Math.min(index * 100, 500)} group flex items-start gap-6`}
                >
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 transition-transform duration-300 group-hover:scale-110">
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="mt-4 h-16 w-0.5 bg-gradient-to-b from-blue-300 to-purple-300" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <Card className="border-0 bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
                      <CardContent className="p-6">
                        <div className="mb-3 flex items-start justify-between">
                          <CardTitle className="text-xl font-bold text-gray-900">
                            {step.title}
                          </CardTitle>
                          <Badge
                            variant="outline"
                            className="border-blue-200 text-sm font-medium text-blue-700"
                          >
                            {step.duration}
                          </Badge>
                        </div>
                        <CardDescription className="leading-relaxed text-gray-600">
                          {step.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Services Section - Enhanced grid */}
      <div
        id="additional"
        className="additional-services-section bg-gray-50 py-24"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="animate-on-scroll mb-16 text-center">
              <Badge className="mb-4 border-0 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800">
                Services Additionnels
              </Badge>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Pour un accompagnement complet
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-gray-600">
                Des services complémentaires pour optimiser votre projet
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {additionalServices.map((service, index) => (
                <div
                  key={service.title + index}
                  className={`additional-service animate-on-scroll delay-${Math.min(index * 150, 300)} h-full`}
                >
                  <Card className="group h-full border-0 bg-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 transition-transform duration-300 group-hover:scale-110">
                          <service.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="mb-3 text-xl font-bold text-gray-900">
                            {service.title}
                          </CardTitle>
                          <CardDescription className="leading-relaxed text-gray-600">
                            {service.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Consistent with Home/About pages */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-24">
        <div className="container mx-auto px-6 text-center lg:px-8">
          <div className="animate-on-scroll">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Prêt à donner vie à votre projet ?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
              Contactez-moi dès aujourd&apos;hui pour discuter de vos besoins et
              obtenir un devis personnalisé.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-gray-50"
              >
                <Link to="/contact">Me contacter</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Link to="/projects" className="flex items-center gap-2">
                  Voir mes réalisations
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
