import Seo from "../components/SEO";
import { PageHeroSection } from "../components/PageHeroSection";
import { ComponentShowcase } from "../components/ui/component-showcase";
import { EnhancedFooter } from "../components/ui/enhanced-footer";
import { EnhancedNavBar } from "../components/ui/enhanced-navbar";
import { EnhancedCTASection } from "../components/ui/enhanced-cta";
import { EnhancedSectionHeader } from "../components/ui/enhanced-section-header";
import { Code2, Sparkles } from "lucide-react";
import banner from "../assets/images/project_banner.svg";

/**
 * Components Demo Page
 * Showcases all the enhanced shadcn/ui components
 */
export const ComponentsDemo = () => {
  return (
    <>
      {" "}
      <Seo
        page="projects"
        customTitle="Composants shadcn/ui - Démonstration"
        customDescription="Découvrez tous les composants shadcn/ui enhanced créés pour ce portfolio moderne."
      />
      {/* Enhanced Navigation */}
      <EnhancedNavBar />
      {/* Hero Section */}
      <PageHeroSection
        title="Composants Enhanced"
        description="Découvrez tous les composants shadcn/ui améliorés créés pour ce portfolio moderne. Design system complet avec animations et interactivité."
        bannerSrc={banner}
        bannerAlt="Components showcase banner"
        className="bg-gradient-to-br from-blue-50 via-white to-purple-50"
      />
      {/* Section Header Examples */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <EnhancedSectionHeader
            badge={{
              text: "Design System",
              icon: <Sparkles className="h-3 w-3" />,
            }}
            title="Enhanced Section Headers"
            subtitle="Différents layouts disponibles"
            description="Démonstration des différents styles de headers disponibles avec actions intégrées."
            layout="centered"
            showSeparator
            actions={{
              primary: {
                text: "Voir le code",
                onClick: () => {},
              },
              secondary: {
                text: "Documentation",
                onClick: () => {},
              },
            }}
          />

          <div className="mt-16 grid gap-12">
            <EnhancedSectionHeader
              badge={{
                text: "Layout Split",
                variant: "outline",
              }}
              title="Header en Split Layout"
              description="Parfait pour présenter du contenu avec une image ou un élément graphique à côté."
              layout="split"
              actions={{
                primary: {
                  text: "Découvrir",
                  onClick: () => {},
                },
              }}
            >
              <div className="rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-center text-white">
                <Code2 className="mx-auto mb-4 h-16 w-16" />
                <p className="text-lg font-semibold">Contenu personnalisé</p>
              </div>
            </EnhancedSectionHeader>

            <EnhancedSectionHeader
              badge={{
                text: "Layout Card",
                variant: "secondary",
              }}
              title="Header en Card Layout"
              subtitle="Mise en évidence"
              description="Idéal pour attirer l'attention sur une section importante."
              layout="card"
              actions={{
                primary: {
                  text: "Action Principale",
                  onClick: () => {},
                },
                secondary: {
                  text: "En savoir plus",
                  onClick: () => {},
                },
              }}
            />
          </div>
        </div>
      </section>
      {/* Main Component Showcase */}
      <section className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <ComponentShowcase />
        </div>
      </section>
      {/* Enhanced CTA */}
      <EnhancedCTASection
        title="Prêt à utiliser ces composants ?"
        description="Tous ces composants sont disponibles et prêts à être intégrés dans vos projets. Design moderne, accessibilité et performance au rendez-vous."
        primaryCta={{
          text: "Commencer maintenant",
          href: "/contact",
        }}
        secondaryCta={{
          text: "Voir le code source",
          href: "https://github.com",
          icon: <Code2 className="h-4 w-4" />,
        }}
      />
      {/* Enhanced Footer */}
      <EnhancedFooter />
    </>
  );
};

export default ComponentsDemo;
