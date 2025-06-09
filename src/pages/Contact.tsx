import { useRef, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import sanitizeHtml, { IOptions } from "sanitize-html";
import { zodResolver } from "@hookform/resolvers/zod";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Github,
  Linkedin,
  MessageSquare,
  Clock,
  Globe,
  User,
  HelpCircle,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import { AnimatedSection } from "../components/ui/animated-section";
import Breadcrumb from "../components/ui/breadcrumb";
import SectionNavigation from "../components/ui/section-navigation";

gsap.registerPlugin(ScrollTrigger);

const sanitizeOptions: IOptions = {
  allowedTags: [],
  allowedAttributes: {},
  disallowedTagsMode: "recursiveEscape",
};

const sanitizeInput = (input: string): string => {
  return sanitizeHtml(input, sanitizeOptions);
};

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  company: z.string().optional(),
  email: z.string().email("Format d'email invalide"),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormInputs = z.infer<typeof contactSchema>;

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "contact@quentinsautiere.com",
    link: "mailto:contact@quentinsautiere.com",
    description: "Réponse sous 24h",
  },
  {
    icon: Phone,
    title: "Téléphone",
    value: "+33 6 51 54 69 48",
    link: "tel:+33600000000",
    description: "Lun-Ven 9h-18h",
  },
  {
    icon: MapPin,
    title: "Localisation",
    value: "France",
    link: "https://www.google.fr/maps/place/La+Rochelle/@46.1555459,-1.1832109,13z/data=!4m6!3m5!1s0x48015383c9253d75:0x405d39260ee9640!8m2!3d46.160329!4d-1.151139!16zL20vMHFiNDg?entry=ttu&g_ep=EgoyMDI1MDYwNC4wIKXMDSoASAFQAw%3D%3D",
    description: "Travail à distance",
  },
];

const socialLinks = [
  {
    icon: Github,
    name: "GitHub",
    url: "https://github.com/SautiereQDev",
    color: "hover:text-gray-800",
  },
  {
    icon: Linkedin,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/quentin-sauti%C3%A8re/",
    color: "hover:text-blue-600",
  },
];

const sections = [
  { id: "intro", title: "Introduction", icon: User },
  { id: "contact-info", title: "Informations", icon: MessageSquare },
  { id: "form", title: "Formulaire", icon: Send },
  { id: "faq", title: "FAQ", icon: HelpCircle },
];

const faqs = [
  {
    question: "Quel est votre délai de réponse ?",
    answer:
      "Je réponds généralement sous 24h maximum. Pour les urgences, n'hésitez pas à mentionner la priorité dans votre message.",
  },
  {
    question: "Proposez-vous des consultations gratuites ?",
    answer:
      "Oui, je propose un premier appel de 30 minutes gratuit pour discuter de votre projet et voir comment je peux vous aider.",
  },
  {
    question: "Travaillez-vous avec des équipes ?",
    answer:
      "Non, je travaille en freelance de manière indépendante. Je gère chaque projet de A à Z pour garantir une qualité optimale.",
  },
  {
    question: "Quels sont vos tarifs ?",
    answer:
      "Mes tarifs varient selon la complexité du projet. Contactez-moi pour un devis personnalisé et détaillé.",
  },
];

export const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactCardsRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      if (heroRef.current) {
        const tl = gsap.timeline();

        tl.from(".hero-title", {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        })
          .from(
            ".hero-subtitle",
            {
              y: 30,
              opacity: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.6",
          )
          .from(
            ".hero-badges",
            {
              y: 20,
              opacity: 0,
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.4",
          );
      }

      // Contact cards animation
      if (contactCardsRef.current) {
        gsap.from(".contact-card", {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactCardsRef.current,
            start: "top 80%",
          },
        });
      }

      // Form animations
      if (formRef.current) {
        gsap.from(".form-field", {
          x: -30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
        });
      }

      // FAQ animations
      gsap.from(".faq-item", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".faq-section",
          start: "top 80%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    try {
      const sanitizedData = {
        nom: sanitizeInput(data.name),
        company: data.company ? sanitizeInput(data.company) : undefined,
        email: sanitizeInput(data.email),
        message: sanitizeInput(data.message),
        source: "https://quentinsautiere.com",
      };

      const response = await fetch("https://api.quentinsautiere.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) throw new Error("Erreur d'envoi");

      reset();
      setIsSubmitted(true);

      // Animation de succès
      gsap.to(".success-message", {
        scale: 1.05,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
    }
  };
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
        <section
          ref={heroRef}
          className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.3)_1px,transparent_0)] bg-[length:50px_50px]"></div>
          </div>

          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-8">
              <div className="hero-badges flex justify-center gap-2 mb-6">
                <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-0">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  Disponible
                </Badge>
                <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-0">
                  <Clock className="w-3 h-3 mr-1" />
                  Réponse 24h
                </Badge>
              </div>

              <h1 className="hero-title text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                Créons ensemble
                <span className="block">quelque chose de génial</span>
              </h1>

              <p className="hero-subtitle text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Vous avez un projet en tête ? Discutons de vos idées et
                donnons-leur vie ensemble. Je suis là pour transformer votre
                vision en réalité digitale.
              </p>
            </div>
          </div>
        </section>
      </div>
      {/* Contact Methods */}
      <div id="contact-info">
        <AnimatedSection className="py-16 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Comment me contacter
              </h2>
              <p className="text-xl text-gray-600">
                Plusieurs moyens de me joindre selon vos préférences
              </p>
            </div>

            <div
              ref={contactCardsRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              {contactMethods.map((method, index) => (
                <Card
                  key={index}
                  className="contact-card bg-white border-gray-200 hover:shadow-lg transition-all duration-300 group h-full"
                >
                  <CardContent className="p-6 text-center h-full flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                        <method.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-gray-900 font-semibold text-lg mb-2">
                        {method.title}
                      </h3>
                      <a
                        href={method.link}
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200 block mb-2 font-medium"
                      >
                        {method.value}
                      </a>
                    </div>
                    <p className="text-gray-500 text-sm mt-auto">
                      {method.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
      {/* Main Content */}
      <div id="form" className="container mx-auto px-6 lg:px-8 pb-16 mt-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedSection>
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Envoyez-moi un message
                </CardTitle>
                <p className="text-gray-600">
                  Remplissez le formulaire ci-dessous et je vous répondrai
                  rapidement.
                </p>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="success-message text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Message envoyé avec succès !
                    </h3>
                    <p className="text-gray-600">
                      Je vous répondrai dans les plus brefs délais.
                    </p>
                  </div>
                ) : (
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="form-field">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom *
                      </label>
                      <Input
                        {...register("name")}
                        placeholder="Votre nom complet"
                        className="border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="form-field">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Entreprise
                      </label>
                      <Input
                        {...register("company")}
                        placeholder="Votre entreprise ou organisation"
                        className="border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div className="form-field">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        {...register("email")}
                        placeholder="votre@email.com"
                        className="border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="form-field">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        {...register("message")}
                        placeholder="Décrivez votre projet, vos besoins ou posez-moi vos questions..."
                        rows={6}
                        className="border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Envoi en cours...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Send className="w-4 h-4 mr-2" />
                          Envoyer le message
                        </div>
                      )}
                    </Button>
                  </form>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-gray-500 text-sm text-center mb-4">
                    Ou contactez-moi directement :
                  </p>
                  <div className="flex justify-center">

                    <Button
                      asChild
                      variant="outline"
                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <a href="mailto:contact@quentinsautiere.com">
                        <Mail className="w-4 h-4 mr-2" />
                        Ouvrir l&apos;application mail
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Additional Info */}
          <div className="space-y-8">
            {/* Social Links */}
            <AnimatedSection>
              <Card className="bg-white border-gray-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
                    <Globe className="w-5 h-5 mr-2" />
                    Retrouvez-moi sur
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300 group"
                      >
                        <social.icon
                          className={`w-6 h-6 text-gray-600 ${social.color} transition-colors duration-300 mb-2`}
                        />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                          {social.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
      {/* FAQ Section */}
      <div id="faq">
        <AnimatedSection className="faq-section py-16 bg-gray-50">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Questions fréquentes
                </h2>
                <p className="text-xl text-gray-600">
                  Trouvez rapidement les réponses à vos questions
                </p>
              </div>

              <Card className="bg-white border-gray-200 shadow-lg">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {faqs.map((faq, index) => (
                      <div key={index} className="faq-item">
                        <h4 className="text-gray-900 font-semibold text-lg mb-3">
                          {faq.question}
                        </h4>
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                        {index < faqs.length - 1 && (
                          <div className="border-b border-gray-200 mt-6" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Contact;
