import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { User, GraduationCap, Star, Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { AnimatedSection } from "../components/ui/animated-section";
import Breadcrumb from "../components/ui/breadcrumb";
import SectionNavigation from "../components/ui/section-navigation";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-body">
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
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <img
                  src={banner}
                  alt="À propos"
                  className="w-64 mx-auto mb-8 drop-shadow-2xl animate-float"
                />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Développeur web et logiciel
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
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
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    À propos de moi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-gray-700 leading-relaxed text-center">
                    Étudiant en deuxième année de licence informatique à
                    l'Université de La Rochelle, je suis passionné par les
                    nouvelles technologies et l'innovation. J'aime relever des
                    défis et mener mes projets avec rigueur et créativité. En
                    parallèle, je me dépasse également sur la piste en
                    compétition de demi-fond, où persévérance et performance
                    sont mes maîtres-mots.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Éducation */}
      <div id="education">
        <AnimatedSection className="py-20 bg-white/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Formation
                </h2>
              </div>
              <div className="space-y-6">
                {about.education.map((item, index) => (
                  <Card
                    key={index}
                    className="p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 group hover:scale-[1.02]"
                  >

                    <div className="flex items-start gap-4">
                      {/* Logos conditionnels selon la formation */}
                      {item.title === "Licence Informatique" ? (
                        <img
                          src="/logo_lr_univ.png"
                          alt="Université de La Rochelle"
                          className="w-12 h-12 object-contain rounded-full"
                        />
                      ) : item.title === "CQP IV - Moniteur de voile" ? (
                        <img
                          src="/glenans.png"
                          alt="École de voile des Glénans"
                          className="w-12 h-12 object-contain rounded-full border border-gray-400"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                      )}
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 mb-1">{item.date}</p>
                        <p className="text-gray-600 mb-2">{item.school}</p>
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
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Compétences
                </h2>
              </div>

              <Card className="p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                <div className="flex flex-wrap gap-3 justify-center">
                  {about.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="px-4 py-2 text-lg font-medium border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 cursor-default hover:scale-105"
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
        <AnimatedSection className="py-20 bg-white/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Passions
                </h2>
              </div>

              <Card className="p-8 shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                <div className="flex flex-wrap gap-4 justify-center">
                  {about.interests.map((interest, index) => (
                    <Badge
                      key={index}
                      className="px-6 py-3 text-lg font-medium bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white border-0 transition-all duration-300 cursor-default hover:scale-105"
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
