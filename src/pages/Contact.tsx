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
  MessageSquare,
  Clock,
  Globe,
} from "lucide-react";
import { LinkedInIconModern, GitHubIcon } from "../components/ui/icons";
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
import { CustomAlert } from "../components/ui/custom-alert";
import { Separator } from "../components/ui/separator";

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
    icon: GitHubIcon,
    name: "GitHub",
    url: "https://github.com/SautiereQDev",
    color: "hover:text-gray-800",
  },
  {
    icon: LinkedInIconModern,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/quentin-sauti%C3%A8re/",
    color: "hover:text-blue-600",
  },
];

const faqs = [
  {
    question: "Quel est votre délai de réponse ?",
    answer: "Je réponds généralement dans les 24 heures.",
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
            "-=0.6"
          )
          .from(
            ".hero-badges",
            {
              y: 20,
              opacity: 0,
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.4"
          );
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
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) {
        console.error(
          "Erreur de réponse:",
          response.status,
          response.statusText
        );
        throw new Error(`Erreur d'envoi: ${response.status}`);
      }

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
      {/* Hero Section */}
      <div id="intro">
        <section
          ref={heroRef}
          className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20"
        >
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.3)_1px,transparent_0)] bg-[length:50px_50px]"></div>
          </div>

          <div className="relative z-10 container mx-auto px-6 lg:px-8">
            <div className="space-y-8 text-center">
              <div className="hero-badges mb-6 flex justify-center gap-2">
                <Badge className="border-0 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                  <MessageSquare className="mr-1 h-3 w-3" />
                  Disponible
                </Badge>
                <Badge className="border-0 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800">
                  <Clock className="mr-1 h-3 w-3" />
                  Réponse 24h
                </Badge>
              </div>

              <h1 className="hero-title bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl leading-tight font-bold text-transparent md:text-6xl">
                Créons ensemble{" "}
                <span className="block">quelque chose de génial</span>
              </h1>

              <p className="hero-subtitle mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
                Vous avez un projet en tête ? Discutons de votre idée et
                donnons-lui vie ensemble. Je suis là pour transformer votre
                vision en réalité.
              </p>
            </div>
          </div>
        </section>
      </div>
      {/* Contact Methods */}
      <div id="contact-info">
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Comment me contacter
              </h2>
              <p className="text-xl text-gray-600">
                Tout les moyens de me contacter pour discuter de votre projet
              </p>
            </div>

            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
              {contactMethods.map((method) => (
                <Card
                  key={method.title}
                  className="group h-full border-gray-200 bg-white transition-all duration-300 hover:shadow-lg"
                >
                  <CardContent className="flex h-full flex-col justify-between p-6 text-center">
                    <div>
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-transform duration-300 group-hover:scale-110">
                        <method.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900">
                        {method.title}
                      </h3>
                      <a
                        href={method.link}
                        className="mb-2 block font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
                      >
                        {method.value}
                      </a>
                    </div>
                    <p className="mt-auto text-sm text-gray-500">
                      {method.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div id="form" className="container mx-auto mt-12 px-6 pb-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div>
            <Card className="border-gray-200 bg-white shadow-lg">
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
                {" "}
                {isSubmitted ? (
                  <div className="success-message w-full py-8">
                    <CustomAlert
                      type="success"
                      title="Message envoyé avec succès !"
                      description="Je vous répondrai dans les plus brefs délais. Merci de votre intérêt !"
                      action={{
                        label: "Envoyer un autre message",
                        onClick: () => setIsSubmitted(false),
                      }}
                      dismissible={true}
                    />
                  </div>
                ) : (
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="form-field">
                      <label
                        htmlFor="contact-name"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Nom *
                      </label>
                      <Input
                        id="contact-name"
                        {...register("name")}
                        placeholder="Votre nom complet"
                        className="border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="form-field">
                      <label
                        htmlFor="contact-company"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Entreprise
                      </label>
                      <Input
                        id="contact-company"
                        {...register("company")}
                        placeholder="Votre entreprise ou organisation"
                        className="border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="form-field">
                      <label
                        htmlFor="contact-email"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Email *
                      </label>
                      <Input
                        id="contact-email"
                        type="email"
                        {...register("email")}
                        placeholder="votre@email.com"
                        className="border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="form-field">
                      <label
                        htmlFor="contact-message"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Message *
                      </label>
                      <Textarea
                        id="contact-message"
                        {...register("message")}
                        placeholder="Décrivez votre projet, vos besoins ou posez-moi vos questions..."
                        rows={6}
                        className="border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full transform rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                          Envoi en cours...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Send className="mr-2 h-4 w-4" />
                          Envoyer le message
                        </div>
                      )}
                    </Button>
                  </form>
                )}
                <div className="mt-6 pt-6">
                  <Separator className="mb-6" />
                  <p className="mb-4 text-center text-sm text-gray-500">
                    Ou contactez-moi directement :
                  </p>
                  <div className="flex justify-center">
                    <Button
                      asChild
                      variant="outline"
                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <a href="mailto:contact@quentinsautiere.com">
                        <Mail className="mr-2 h-4 w-4" />
                        Ouvrir l&apos;application mail
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="space-y-8">
            {/* Social Links */}
            <div>
              <Card className="border-gray-200 bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl font-bold text-gray-900">
                    <Globe className="mr-2 h-5 w-5" />
                    Retrouvez-moi sur
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center rounded-lg bg-gray-50 p-4 transition-all duration-300 hover:bg-gray-100"
                      >
                        <social.icon
                          className={`h-6 w-6 text-gray-600 ${social.color} mb-2 transition-colors duration-300`}
                        />
                        <span className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-900">
                          {social.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      {/* FAQ Section */}
      <div id="faq">
        <div className="faq-section bg-gray-50 py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                  Questions fréquentes
                </h2>
                <p className="text-xl text-gray-600">
                  Trouvez rapidement les réponses à vos questions
                </p>
              </div>

              <Card className="border-gray-200 bg-white shadow-lg">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {faqs.map((faq, index) => (
                      <div key={faq.question + index} className="faq-item">
                        <h4 className="mb-3 text-lg font-semibold text-gray-900">
                          {faq.question}
                        </h4>
                        <p className="leading-relaxed text-gray-600">
                          {faq.answer}
                        </p>
                        {index < faqs.length - 1 && (
                          <div className="mt-6">
                            <Separator />
                          </div>
                        )}
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
  );
};

export default Contact;
