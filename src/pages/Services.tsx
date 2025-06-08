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
  Briefcase,
  Settings,
  Target
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { AnimatedSection } from "../components/ui/animated-section";
import Breadcrumb from "../components/ui/breadcrumb";
import SectionNavigation from "../components/ui/section-navigation";
import banner from "../assets/images/services_banner.svg";
import serviceDetails from "../data/servicesDetails.json";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    icon: Calendar,
    title: "Consultation initiale",
    duration: "30 minutes",
    description: "Analyse de vos besoins et définition du projet"
  },
  {
    icon: FileText,
    title: "Proposition du projet",
    duration: "1 à 2 semaines",
    description: "Cahier des charges détaillé et devis personnalisé"
  },
  {
    icon: Code,
    title: "Développement",
    duration: "Variable selon complexité",
    description: "Création de votre solution sur mesure"
  },
  {
    icon: Check,
    title: "Révision finale",
    duration: "1 semaine",
    description: "Tests et ajustements selon vos retours"
  },
  {
    icon: Rocket,
    title: "Lancement du site",
    duration: "Instantané",
    description: "Mise en ligne et formation à l'utilisation"
  }
];

const additionalServices = [
  {
    icon: Wrench,
    title: "Maintenance & support",
    description: "J'assure la maintenance et le support de votre site 1 an après la livraison, le service est renouvelable."
  },
  {
    icon: Search,
    title: "Consulting",
    description: "Si vous n'êtes pas sûr du type de site dont vous avez besoin, je peux également vous aider à le déterminer."
  }
];

export const Service = () => {
  const sections = [
    { id: "intro", title: "Introduction", icon: Briefcase },
    { id: "pricing", title: "Tarifs", icon: Target },
    { id: "process", title: "Processus", icon: Settings },
    { id: "additional", title: "Services supplémentaires", icon: Wrench },
    { id: "contact", title: "Contact", icon: ArrowRight }
  ];

  useEffect(() => {
    // Animation pour les cartes de services
    const cards = document.querySelectorAll('[data-service-card]');
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            once: true
          }
        }
      );
    });

    // Animation pour les étapes du processus
    const steps = document.querySelectorAll('[data-process-step]');
    steps.forEach((step, index) => {
      gsap.fromTo(step,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            once: true
          }
        }
      );
    });
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-body">
      {/* Navigation par sections */}
      <SectionNavigation sections={sections} />
      {/* Breadcrumb */}
      <div className="pt-4 pb-4">
        <div className="container mx-auto px-4">
          <Breadcrumb />
        </div>
      </div>{/* Hero Section */}
      <div id="intro">
        <AnimatedSection className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
          <div className="container mx-auto px-4 relative z-10 ">
            <div className="max-w-4xl mx-auto text-center ">
              <div className="mb-8 ">
                <img
                  src={banner}
                  alt="Services"
                  className="w-64 mx-auto mb-8 drop-shadow-2xl"
                />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Développement Web
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Je suis spécialisé dans le développement Web full-stack, qui comprend à la fois le travail front-end et back-end.
                Je peux vous aider avec tout, des simples pages de destination aux applications Web complexes.
              </p>
            </div>
          </div>        </AnimatedSection>
      </div>

      {/* Services Pricing */}
      <div id="pricing">
        <AnimatedSection className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Mes Offres
                </h2>
                <p className="text-lg text-gray-600">Des solutions adaptées à vos besoins et votre budget</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Site Vitrine */}
                <Card data-service-card className="p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:scale-105 transition-all duration-300 group">
                  <CardHeader className="text-center pb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-800 mb-2">Site Vitrine</CardTitle>
                    <div className="text-center">
                      <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">700€</span>
                      <span className="text-gray-600 text-lg">/site</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {serviceDetails.simple.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Site Complexe */}
                <Card data-service-card className="p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-sm hover:scale-105 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Populaire
                    </Badge>
                  </div>
                  <CardHeader className="text-center pb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Database className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-800 mb-2">Site Web Complexe</CardTitle>
                    <div className="text-center">
                      <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">+2000€</span>
                      <span className="text-gray-600 text-lg">/site</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Star className="w-3 h-3 text-blue-600" />
                        </div>
                        <span className="text-blue-700 font-medium">Inclut toutes les fonctionnalités du plan précédent</span>
                      </div>
                      {serviceDetails.complex.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>                </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Process Section */}
      <div id="process">
        <AnimatedSection className="py-20 bg-white/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Comment ça marche
                </h2>
                <p className="text-lg text-gray-600">Un processus éprouvé pour votre réussite</p>
              </div>

              <div className="space-y-8">
                {processSteps.map((step, index) => (
                  <div key={index} data-process-step className="flex items-start gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      {index < processSteps.length - 1 && (
                        <div className="w-0.5 h-16 bg-gradient-to-b from-blue-300 to-purple-300 mt-4" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <Card className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
                          <Badge variant="outline" className="text-sm font-medium">
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
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Services Additionnels
                </h2>
                <p className="text-lg text-gray-600">Pour un accompagnement complet</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {additionalServices.map((service, index) => (
                  <Card key={index} className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group hover:scale-105">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{service.description}</p>
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
        <AnimatedSection className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Prêt à donner vie à votre projet ?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Contactez-moi dès aujourd'hui pour discuter de vos besoins et obtenir un devis personnalisé.
              </p>
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Me contacter
                  <ArrowRight className="w-5 h-5" />
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
