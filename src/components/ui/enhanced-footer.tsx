import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ExternalLink, Mail, Heart } from "lucide-react";
import { gsap } from "gsap";
import { Button } from "./button";
import { Separator } from "./separator";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const socialLinks = [
  {
    name: "GitHub",
    icon: ExternalLink,
    url: "https://github.com/SautiereQDev",
    description: "Mes projets open source",
    hoverColor: "hover:text-gray-900 hover:bg-gray-100",
  },
  {
    name: "LinkedIn",
    icon: ExternalLink,
    url: "https://linkedin.com/in/quentin-sautiere",
    description: "Mon profil professionnel",
    hoverColor: "hover:text-blue-600 hover:bg-blue-50",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:contact@quentinsautiere.com",
    description: "Me contacter directement",
    hoverColor: "hover:text-green-600 hover:bg-green-50",
  },
];

const navigationLinks = [
  { name: "Accueil", path: "/" },
  { name: "À propos", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Projets", path: "/projects" },
  { name: "Contact", path: "/contact" },
];

const contactLinks = [
  {
    name: "contact@quentinsautiere.com",
    url: "mailto:contact@quentinsautiere.com",
    type: "email" as const,
  },
  {
    name: "06 51 54 69 48",
    url: "tel:+33651546948",
    type: "phone" as const,
  },
];

/**
 * Enhanced Footer Component using shadcn/ui components
 * Features improved accessibility, tooltips, and shadcn/ui styling
 */
export const EnhancedFooter = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.from(entry.target.children, {
              y: 30,
              opacity: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <TooltipProvider>
      <footer
        ref={footerRef}
        className="relative border-t bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:25px_25px]"></div>
        </div>

        <div className="relative">
          <div className="container mx-auto px-6 py-16 lg:px-8">
            {/* Main Footer Content */}
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
              {/* Brand Section */}
              <div className="space-y-6 lg:col-span-2">
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600">
                    <span className="text-lg font-bold text-white">S</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Quentin Sautière
                    </h3>
                    <Badge
                      variant="secondary"
                      className="mt-1 bg-blue-100 text-blue-800"
                    >
                      Développeur Full-Stack
                    </Badge>
                  </div>
                </div>
                <p className="max-w-md leading-relaxed text-gray-400">
                  Passionné par le développement web moderne, je crée des
                  expériences numériques innovantes et performantes avec les
                  dernières technologies.
                </p>

                {/* Social Links with Tooltips */}
                <div className="flex space-x-2">
                  {socialLinks.map((social) => (
                    <Tooltip key={social.name}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className={`border-gray-700 bg-gray-800 text-gray-400 transition-all duration-300 ${social.hoverColor} hover:scale-110 hover:border-transparent`}
                          asChild
                        >
                          <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.name}
                          >
                            <social.icon className="h-5 w-5" />
                          </a>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p className="font-medium">{social.name}</p>
                        <p className="text-muted-foreground text-xs">
                          {social.description}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-white">Navigation</h4>
                <nav className="space-y-3">
                  {navigationLinks.map((link) => (
                    <Button
                      key={link.path}
                      variant="ghost"
                      className="h-auto justify-start p-0 text-gray-400 hover:bg-transparent hover:text-white"
                      asChild
                    >
                      <Link
                        to={link.path}
                        className="block transition-all duration-300 hover:translate-x-1"
                      >
                        {link.name}
                      </Link>
                    </Button>
                  ))}
                </nav>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h4 className="text-lg font-semibold text-white">Contact</h4>
                <div className="space-y-3">
                  {contactLinks.map((contact) => (
                    <Card
                      key={contact.name}
                      className="border-gray-700 bg-gray-800/50"
                    >
                      <CardContent className="p-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-left text-gray-400 hover:bg-transparent hover:text-white"
                          asChild
                        >
                          <a
                            href={contact.url}
                            className="block transition-all duration-300 hover:translate-x-1"
                          >
                            <div className="text-xs tracking-wide text-gray-500 uppercase">
                              {contact.type}
                            </div>
                            <div className="font-medium">{contact.name}</div>
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            <Separator className="my-12 bg-gray-700" />

            {/* Footer Bottom */}
            <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Quentin Sautière. Tous droits
                réservés.
              </p>
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <span>Fait avec le</span>
                <Heart className="h-4 w-4 animate-pulse text-red-500" />
                <span>depuis La Rochelle</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </TooltipProvider>
  );
};

export default EnhancedFooter;
