import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Github, Heart, Linkedin, Mail } from "lucide-react";
import { gsap } from "gsap";

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/SautiereQDev",
      color: "hover:text-gray-900",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/quentin-sautière",
      color: "hover:text-blue-600",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:contact@quentinsautiere.com",
      color: "hover:text-green-600",
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
    },
    {
      name: "06 51 54 69 48",
      url: "tel:+33651546948",
    },
  ];

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
    <footer
      ref={footerRef}
      className="bg-gradient-to-br from-gray-900 to-gray-800 font-[Manrope] text-white"
    >
      <div className="container mx-auto px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Logo et description */}
          <div className="space-y-6 md:col-span-2">
            <div>
              <h3 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent">
                Quentin Sautière
              </h3>
              <p className="mt-2 text-gray-300">
                Développeur Full-Stack & Designer
              </p>
            </div>
            <p className="max-w-md leading-relaxed text-gray-400">
              Passionné par la création d&apos;expériences digitales
              exceptionnelles. Je transforme vos idées en solutions techniques
              innovantes et performantes.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-lg bg-gray-800 p-3 text-gray-400 transition-all duration-300 hover:bg-gray-700 ${social.color} hover:scale-110`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Navigation</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="inline-block transform text-gray-400 transition-colors duration-500 hover:translate-x-1 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Navigation</h4>
            <ul className="space-y-3">
              {contactLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.url}
                    className="inline-block transform text-gray-400 transition-colors duration-500 hover:translate-x-1 hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Quentin Sautière. Tous droits
              réservés.
            </p>
            <p className="flex items-center gap-1 text-sm text-gray-400">
              Fait avec le <Heart className="h-4 w-4 text-red-500" /> depuis La
              Rochelle
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
