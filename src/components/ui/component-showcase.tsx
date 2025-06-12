import { useState } from "react";
import {
  Star,
  Sparkles,
  Heart,
  Code2,
  Palette,
  Zap,
  Target,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";
import { Badge } from "./badge";
import { Progress } from "./progress";
import { Separator } from "./separator";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { EnhancedAlert } from "./enhanced-alert";
import { EnhancedTabs } from "./enhanced-tabs";
import { InfoCard } from "./info-card";

/**
 * Comprehensive shadcn/ui Components Showcase
 * Demonstrates advanced usage and combinations of shadcn/ui components
 */
export const ComponentShowcase = () => {
  const [selectedService, setSelectedService] = useState("web");
  const [progress, setProgress] = useState(75);

  const services = [
    {
      id: "web",
      title: "Développement Web",
      icon: Code2,
      description: "Applications web modernes et performantes",
      features: ["React/Next.js", "TypeScript", "Tailwind CSS", "API REST"],
      color: "from-blue-600 to-cyan-600",
    },
    {
      id: "mobile",
      title: "Applications Mobile",
      icon: Palette,
      description: "Apps natives et cross-platform",
      features: ["React Native", "Flutter", "iOS/Android", "UI/UX"],
      color: "from-purple-600 to-pink-600",
    },
    {
      id: "api",
      title: "APIs & Backend",
      icon: Zap,
      description: "Services backend robustes et scalables",
      features: ["Node.js", "PostgreSQL", "Redis", "Docker"],
      color: "from-green-600 to-emerald-600",
    },
  ];
  const tabsData = [
    {
      id: "overview",
      label: "Aperçu",
      badge: "New",
      content: (
        <div className="space-y-6">
          <InfoCard
            title="Portfolio Moderne"
            description="Découvrez mes derniers projets et compétences"
            initials="QS"
            badges={["React", "TypeScript", "Tailwind"]}
            progress={{
              label: "Completion",
              value: 8,
              max: 10,
            }}
            location="La Rochelle, France"
            date="2024"
            actionLabel="Voir le code"
            actionHref="https://github.com"
          />
        </div>
      ),
    },
    {
      id: "services",
      label: "Services",
      badge: "Popular",
      content: (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-lg ${
                selectedService === service.id ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedService(service.id)}
            >
              <CardHeader className="text-center">
                <div
                  className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r ${service.color} transition-transform duration-300 group-hover:scale-110`}
                >
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <Badge
                        key={feature}
                        variant="secondary"
                        className="text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Popularité
                    </span>
                    <div className="flex items-center space-x-1">
                      {" "}
                      {[...Array(5)].map((_, starIndex) => (
                        <Star
                          key={`star-${starIndex}`}
                          className={`h-4 w-4 ${
                            starIndex < 4
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ),
    },
    {
      id: "features",
      label: "Fonctionnalités",
      content: (
        <div className="space-y-6">
          <Alert>
            <Sparkles className="h-4 w-4" />
            <AlertTitle>Nouveautés disponibles !</AlertTitle>
            <AlertDescription>
              Découvrez les dernières fonctionnalités ajoutées à notre
              plateforme.
            </AlertDescription>
          </Alert>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Progression du Projet
                </CardTitle>{" "}
                <CardDescription>
                  Suivi en temps réel de l&apos;avancement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Développement</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setProgress(Math.max(0, progress - 10))}
                  >
                    -10%
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setProgress(Math.min(100, progress + 10))}
                  >
                    +10%
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Équipe</CardTitle>
                <CardDescription>Membres actifs du projet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex -space-x-2">
                  {" "}
                  {[1, 2, 3, 4].map((userId) => (
                    <TooltipProvider key={`user-${userId}`}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Avatar className="border-2 border-white">
                            <AvatarImage
                              src={`https://avatar.vercel.sh/user${userId}.png`}
                            />
                            <AvatarFallback>U{userId}</AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Utilisateur {userId}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50">
                    <span className="text-sm text-gray-500">+5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ),
    },
  ];

  return (
    <TooltipProvider>
      <div className="space-y-12 p-6">
        {/* Header Section */}
        <div className="space-y-4 text-center">
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <Sparkles className="mr-2 h-4 w-4" />
            Vitrine des Composants
          </Badge>
          <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
            shadcn/ui Components Showcase
          </h1>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Démonstration complète des composants shadcn/ui avec des exemples
            pratiques et interactifs.
          </p>
        </div>

        {/* Enhanced Alerts Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Enhanced Alerts</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {" "}
            <EnhancedAlert
              type="success"
              title="Projet terminé !"
              description="Votre site web a été mis en ligne avec succès."
              dismissible
              action={{
                label: "Voir le site",
                onClick: () => {},
              }}
            />
            <EnhancedAlert
              type="info"
              title="Mise à jour disponible"
              description="Une nouvelle version des composants est disponible."
              dismissible
            />
          </div>
        </div>

        {/* Enhanced Tabs Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Enhanced Tabs</h2>
          <EnhancedTabs tabs={tabsData} defaultValue="overview" />
        </div>

        {/* Interactive Demo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Démo Interactive
            </CardTitle>
            <CardDescription>
              Explorez les interactions avec les composants
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    Ouvrir Dialog
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Configuration du Projet</DialogTitle>
                    <DialogDescription>
                      Configurez les paramètres de votre nouveau projet.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <InfoCard
                      title="Projet React"
                      description="Application web moderne"
                      initials="R"
                      badges={["TypeScript", "Vite"]}
                    />
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline">Annuler</Button>
                      <Button>Créer</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline">
                <ArrowRight className="mr-2 h-4 w-4" />
                Action Secondaire
              </Button>
            </div>

            <Separator />

            <div className="text-center">
              <p className="text-muted-foreground text-sm">
                Tous les composants sont entièrement personnalisables et
                accessibles.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};

export default ComponentShowcase;
