import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { AnimatedSection } from "../components/ui/animated-section";
import banner from "../assets/images/services_banner.svg";
import serviceDetails from "../data/servicesDetails.json";

gsap.registerPlugin(ScrollTrigger);

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

export const Service = () => {
  useEffect(() => {
    // Animation pour les cartes de services
    const cards = document.querySelectorAll("[data-service-card]");
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            once: true,
          },
        }
      );
    });

    // Animation pour les étapes du processus
    const steps = document.querySelectorAll("[data-process-step]");
    steps.forEach((step, index) => {
      gsap.fromTo(
        step,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            once: true,
          },
        }
      );
    });
  }, []);
  return (
    <div className="font-body min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div id="intro">
        <AnimatedSection className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
          <div className="relative z-10 container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-8">
                <img
                  src={banner}
                  alt="Services"
                  className="mx-auto mb-8 w-64 drop-shadow-2xl"
                />
              </div>
              <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-6xl">
                Développement Web
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl">
                Je suis spécialisé dans le développement Web full-stack, qui
                comprend à la fois le travail front-end et back-end. Je peux
                vous aider avec tout, des simples pages de destination aux
                applications Web complexes.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Services Pricing */}
      <div id="pricing">
        <AnimatedSection className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="mb-16 text-center">
                <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                  Mes Offres
                </h2>
                <p className="text-lg text-gray-600">
                  Des solutions adaptées à vos besoins et votre budget
                </p>
              </div>

              <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
                {/* Site Vitrine */}
                <Card
                  data-service-card
                  className="group border-0 bg-white/80 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  <CardHeader className="pb-6 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-transform duration-300 group-hover:scale-110">
                      <Globe className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="mb-2 text-2xl font-bold text-gray-800">
                      Site Vitrine
                    </CardTitle>
                    <div className="text-center">
                      <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-4xl font-bold text-transparent">
                        700€
                      </span>
                      <span className="text-lg text-gray-600">/site</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {serviceDetails.simple.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Site Complexe */}
                <Card
                  data-service-card
                  className="group relative overflow-hidden border-0 bg-white/80 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      <Star className="mr-1 h-3 w-3" />
                      Populaire
                    </Badge>
                  </div>
                  <CardHeader className="pb-6 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-transform duration-300 group-hover:scale-110">
                      <Database className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="mb-2 text-2xl font-bold text-gray-800">
                      Site Web Complexe
                    </CardTitle>
                    <div className="text-center">
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">
                        +2000€
                      </span>
                      <span className="text-lg text-gray-600">/site</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-2">
                        <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                          <Star className="h-3 w-3 text-blue-600" />
                        </div>
                        <span className="font-medium text-blue-700">
                          Inclut toutes les fonctionnalités du plan précédent
                        </span>
                      </div>
                      {serviceDetails.complex.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Process Section */}
      <div id="process">
        <AnimatedSection className="bg-white/50 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-16 text-center">
                <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                  Comment ça marche
                </h2>
                <p className="text-lg text-gray-600">
                  Un processus éprouvé pour votre réussite
                </p>
              </div>

              <div className="space-y-8">
                {processSteps.map((step, index) => (
                  <div
                    key={index}
                    data-process-step
                    className="group flex items-start gap-6"
                  >
                    <div className="flex flex-col items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-transform duration-300 group-hover:scale-110">
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                      {index < processSteps.length - 1 && (
                        <div className="mt-4 h-16 w-0.5 bg-gradient-to-b from-blue-300 to-purple-300" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <Card className="border-0 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl">
                        <div className="mb-3 flex items-start justify-between">
                          <h3 className="text-xl font-semibold text-gray-800">
                            {step.title}
                          </h3>
                          <Badge
                            variant="outline"
                            className="text-sm font-medium"
                          >
                            {step.duration}
                          </Badge>
                        </div>
                        <p className="text-gray-600">{step.description}</p>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Additional Services */}
      <div id="additional">
        <AnimatedSection className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-16 text-center">
                <h2 className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                  Services Additionnels
                </h2>
                <p className="text-lg text-gray-600">
                  Pour un accompagnement complet
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {additionalServices.map((service, index) => (
                  <Card
                    key={index}
                    className="group border-0 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 transition-transform duration-300 group-hover:scale-110">
                        <service.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-800">
                          {service.title}
                        </h3>
                        <p className="leading-relaxed text-gray-600">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* CTA Section */}
      <div id="contact">
        <AnimatedSection className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                Prêt à donner vie à votre projet ?
              </h2>
              <p className="mb-8 text-xl text-blue-100">
                Contactez-moi dès aujourd&apos;hui pour discuter de vos besoins
                et obtenir un devis personnalisé.
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-xl bg-white px-8 py-6 text-lg font-semibold text-blue-600 shadow-xl transition-all duration-300 hover:bg-gray-100 hover:shadow-2xl"
              >
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Me contacter
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Service;
