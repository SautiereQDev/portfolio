import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User, GraduationCap, Star, Heart } from "lucide-react";
import SEO from "../components/SEO";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { AnimatedSection } from "../components/ui/animated-section";
import Breadcrumb from "../components/ui/breadcrumb";
import SectionNavigation from "../components/ui/SectionNavigation";
import banner from "../assets/images/about_banner.svg";
import about from "../data/about.json";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sections = [
    { id: "intro", title: "Introduction", icon: User },
    { id: "stats", title: "Statistiques", icon: Star },
    { id: "profile", title: "Profil", icon: User },
    { id: "education", title: "Formation", icon: GraduationCap },
    { id: "skills", title: "Compétences", icon: Star },
    { id: "interests", title: "Passions", icon: Heart },
  ];
  return (
    <div className="font-body min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <SEO page="about" />
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
        <AnimatedSection className="relative overflow-hidden py-12">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
          <div className="relative z-10 container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-8">
                <img
                  src={banner}
                  alt="À propos"
                  className="mx-auto mb-8 w-64 drop-shadow-2xl"
                />
              </div>
              <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl leading-tight font-bold text-transparent md:text-6xl">
                Développeur web et logiciel
              </h1>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl">
                Développeur et concepteur Web depuis plus de cinq ans. Je suis
                un amoureux de la création de sites web esthétiques et
                fonctionnels et je contribue au développement de sociétés grâce
                à la création de solutions numériques innovantes.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* À propos */}
      <div id="profile">
        <AnimatedSection className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <Card className="border-0 bg-white/80 p-8 shadow-2xl backdrop-blur-sm">
                <CardHeader className="pb-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
                    À propos de moi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-lg leading-relaxed text-gray-700">
                    Étudiant en deuxième année de licence informatique à
                    l&apos;Université de La Rochelle, je suis passionné par les
                    nouvelles technologies et l&apos;innovation. J&apos;aime
                    relever des défis et mener mes projets avec rigueur et
                    créativité. En parallèle, je me dépasse également sur la
                    piste en compétition de demi-fond, où persévérance et
                    performance sont mes maîtres-mots.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Éducation */}
      <div id="education">
        <AnimatedSection className="bg-white/50 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-blue-500">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
                  Formation
                </h2>
              </div>
              <div className="space-y-6">
                {about.education.map((item, index) => (
                  <Card
                    key={index}
                    className="group border-0 bg-white/80 p-6 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                  >
                    <div className="flex items-start gap-4">
                      {/* Logos conditionnels selon la formation */}
                      {item.title === "Licence Informatique" ? (
                        <img
                          src="/logo_lr_univ.png"
                          alt="Université de La Rochelle"
                          className="h-12 w-12 rounded-full object-contain"
                        />
                      ) : item.title === "CQP IV - Moniteur de voile" ? (
                        <img
                          src="/glenans.png"
                          alt="École de voile des Glénans"
                          className="h-12 w-12 rounded-full border border-gray-400 object-contain"
                        />
                      ) : (
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-transform duration-300 group-hover:scale-110">
                          <GraduationCap className="h-6 w-6 text-white" />
                        </div>
                      )}
                      <div className="flex-grow">
                        <h3 className="mb-2 text-xl font-semibold text-gray-800">
                          {item.title}
                        </h3>
                        <p className="mb-1 text-gray-600">{item.date}</p>
                        <p className="mb-2 text-gray-600">{item.school}</p>
                        {item.mention && (
                          <Badge
                            variant="secondary"
                            className="bg-blue-100 text-blue-700"
                          >
                            Mention: {item.mention}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Compétences */}
      <div id="skills">
        <AnimatedSection className="py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
                  Compétences
                </h2>
              </div>

              <Card className="border-0 bg-white/80 p-8 shadow-2xl backdrop-blur-sm">
                <div className="flex flex-wrap justify-center gap-3">
                  {about.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-default border-2 border-blue-200 px-4 py-2 text-lg font-medium transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:bg-blue-50"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Passions */}
      <div id="interests">
        <AnimatedSection className="bg-white/50 py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-red-500">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
                  Passions
                </h2>
              </div>

              <Card className="border-0 bg-white/80 p-8 shadow-2xl backdrop-blur-sm">
                <div className="flex flex-wrap justify-center gap-4">
                  {about.interests.map((interest, index) => (
                    <Badge
                      key={index}
                      className="cursor-default border-0 bg-gradient-to-r from-pink-500 to-red-500 px-6 py-3 text-lg font-medium text-white transition-all duration-300 hover:scale-105 hover:from-pink-600 hover:to-red-600"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default About;
