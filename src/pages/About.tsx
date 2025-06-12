import { GraduationCap, ArrowRight } from "lucide-react";
import Seo from "../components/SEO";
import { Card, CardContent, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { EnhancedCTASection } from "../components/ui/enhanced-cta-section";
import { OptimizedImage } from "../components/ui/OptimizedImage";
import { useScrollAnimations } from "../hooks/useScrollAnimations";
import banner from "../assets/images/about_banner.svg";
import about from "../data/about.json";

/**
 * About Page - Version refactorisée avec animations CSS fiables
 */
export const About = () => {
  // Hook d'animations simples et fiables
  useScrollAnimations({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div className="min-h-screen bg-white font-[Manrope]">
      <Seo page="about" />

      {/* Hero Section - Animations CSS fiables */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
        <div className="relative z-10 container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="hero-title mb-8">
              <OptimizedImage
                src={banner}
                alt="À propos"
                className="mx-auto mb-8 w-64 drop-shadow-2xl"
              />
            </div>
            <h1 className="hero-subtitle mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl leading-tight font-bold text-transparent md:text-6xl">
              Développeur web et logiciel
            </h1>
            <p className="hero-description mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl">
              Développeur passionné depuis plus de cinq ans, je crée des
              expériences web qui allient esthétique et performance. Mon
              objectif ? Donner vie à vos idées à travers des solutions
              numériques sur mesure qui font vraiment la différence.
            </p>
          </div>
        </div>
      </div>

      {/* Profile Section - Enhanced design */}
      <div id="profile" className="bg-gray-50 py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="animate-on-scroll mb-16 text-center">
              <Badge className="mb-4 border-0 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                Profil
              </Badge>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                À propos de moi
              </h2>
            </div>

            <div className="animate-on-scroll">
              <Card className="profile-card border-0 bg-white shadow-lg">
                <CardContent className="p-8">
                  <div className="flex flex-col items-center gap-8 lg:flex-row">
                    <div className="flex-shrink-0">
                      <OptimizedImage
                        src="/profile_picture.webp"
                        alt="Photo de profil"
                        className="h-48 w-48 rounded-full border-4 border-blue-200 object-cover shadow-lg"
                      />
                    </div>
                    <div className="flex-grow text-center lg:text-left">
                      <h3 className="mb-4 text-2xl font-bold text-gray-900">
                        Quentin Sautière
                      </h3>
                      <CardDescription className="mb-6 text-lg leading-relaxed text-gray-600">
                        Passionné par les innovations technologiques et le
                        design, je transforme vos idées en solutions numériques
                        performantes. Mon approche allie créativité et expertise
                        technique pour créer des expériences utilisateur qui
                        retiendra l&apos;attention de vos clients. Quand je ne
                        code pas, vous me trouverez probablement en train de
                        courir sur piste en compétition de demi-fond,
                        persévérance et performance sont mes maîtres-mots.
                      </CardDescription>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Education Section - Liste verticale comme avant */}
      <div id="education" className="education-section bg-white py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="animate-on-scroll mb-16 text-center">
              <Badge className="mb-4 border-0 bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-800">
                Formation
              </Badge>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Mon parcours académique
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-gray-600">
                Une formation solide pour maîtriser les technologies modernes
              </p>
            </div>

            <div className="space-y-6">
              {about.education.map((item, index) => (
                <div
                  key={item.title}
                  className={`education-card animate-on-scroll delay-${Math.min(index, 5)}00`}
                >
                  <Card className="group border-0 bg-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {" "}
                        {(() => {
                          if (
                            item.school.includes("Université de La Rochelle")
                          ) {
                            return (
                              <OptimizedImage
                                src="/logo_lr_univ.webp"
                                alt="Université de La Rochelle"
                                className="h-12 w-12 rounded-full border border-gray-400 object-contain"
                              />
                            );
                          } else if (
                            item.school.includes("Ecole de voile des Glénans")
                          ) {
                            return (
                              <OptimizedImage
                                src="/glenans.webp"
                                alt="École de voile des Glénans"
                                className="h-12 w-12 rounded-full border border-gray-400 object-contain"
                              />
                            );
                          } else {
                            return (
                              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 transition-transform duration-300 group-hover:scale-110">
                                <GraduationCap className="h-6 w-6 text-white" />
                              </div>
                            );
                          }
                        })()}
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
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section - Enhanced with categories */}
      <div id="skills" className="bg-gray-50 py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="animate-on-scroll mb-16 text-center">
              <Badge className="mb-4 border-0 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800">
                Compétences
              </Badge>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Technologies maîtrisées
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-gray-600">
                Un stack technique moderne pour répondre à tous vos besoins
              </p>
            </div>

            <div className="animate-on-scroll">
              <Card className="border-0 bg-white shadow-lg">
                <CardContent className="p-8">
                  <div className="flex flex-wrap justify-center gap-4">
                    {about.skills.map((skill, index) => (
                      <div
                        key={skill}
                        className={`skill-badge animate-on-scroll delay-${Math.min(index * 50, 500)}`}
                      >
                        <Badge
                          variant="outline"
                          className="cursor-default border-2 border-blue-200 px-4 py-3 text-lg font-medium transition-all duration-300 hover:scale-105 hover:border-blue-400 hover:bg-blue-50"
                        >
                          {skill}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Interests Section - Modern card layout */}
      <div id="interests" className="bg-white py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="animate-on-scroll mb-16 text-center">
              <Badge className="mb-4 border-0 bg-gradient-to-r from-pink-100 to-red-100 text-pink-800">
                Passions
              </Badge>
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
                Mes centres d&apos;intérêt
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-gray-600">
                Ce qui m&apos;inspire au-delà du code
              </p>
            </div>

            <div className="animate-on-scroll">
              <Card className="border-0 bg-gradient-to-br from-pink-50 to-red-50 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex flex-wrap justify-center gap-4">
                    {about.interests.map((interest, index) => (
                      <div
                        key={interest}
                        className={`interest-badge animate-on-scroll delay-${Math.min(index * 100, 500)}`}
                      >
                        <Badge className="cursor-default border-0 bg-gradient-to-r from-pink-500 to-red-500 px-6 py-3 text-lg font-medium text-white transition-all duration-300 hover:scale-105 hover:from-pink-600 hover:to-red-600">
                          {interest}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <EnhancedCTASection
        title="Prêt à collaborer ensemble ?"
        description="Découvrez mes services ou contactez-moi pour discuter de votre projet"
        primaryCta={{
          text: "Voir mes services",
          href: "/services",
        }}
        secondaryCta={{
          text: "Me contacter",
          href: "/contact",
          icon: <ArrowRight className="h-4 w-4" />,
        }}
        badge={{
          text: "Collaboration",
          icon: <GraduationCap className="h-3 w-3" />,
        }}
        variant="gradient"
      />
    </div>
  );
};

export default About;
