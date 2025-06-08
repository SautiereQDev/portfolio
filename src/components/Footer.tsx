import { useEffect, useRef } from "react"
import { Link } from "@tanstack/react-router"
import { Github, Linkedin, Mail, Heart } from "lucide-react"
import { gsap } from "gsap"

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null)

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/SautiereQDev",
      color: "hover:text-gray-900"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/quentin-sautiere",
      color: "hover:text-blue-600"
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:contact@quentinsautiere.com",
      color: "hover:text-green-600"
    }
  ]

  const navigationLinks = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projets", path: "/projects" },
    { name: "Contact", path: "/contact" }
  ]

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
              ease: "power2.out"
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <footer 
      ref={footerRef}
      className="bg-gradient-to-br from-gray-900 to-gray-800 text-white font-[Manrope]"
    >
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Logo et description */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Quentin Sautière
              </h3>
              <p className="text-gray-300 mt-2">
                Développeur Full-Stack & Designer
              </p>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Passionné par la création d'expériences digitales exceptionnelles. 
              Je transforme vos idées en solutions techniques innovantes et performantes.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-gray-800 rounded-lg text-gray-400 transition-all duration-300 hover:bg-gray-700 ${social.color} hover:scale-110`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
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
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Contact</h4>
            <div className="space-y-3 text-gray-400">
              <p>contact@quentinsautiere.com</p>
              <p>+33 (0)6 XX XX XX XX</p>
              <p>France</p>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Quentin Sautière. Tous droits réservés.
            </p>
            <p className="text-gray-400 text-sm flex items-center gap-1">
              Fait avec <Heart className="w-4 h-4 text-red-500" /> en France
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
