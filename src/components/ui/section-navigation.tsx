import { useState, useEffect } from "react"
import { Link } from "@tanstack/react-router"
import { ChevronDown, Eye } from "lucide-react"
import { Button } from "./button"
import { cn } from "../../lib/utils"

interface SectionLink {
    id: string
    title: string
    icon?: React.ComponentType<{ className?: string }>
}

interface SectionNavigationProps {
    sections: SectionLink[]
    className?: string
    position?: "left" | "right"
}

export const SectionNavigation = ({
    sections,
    className,
    position = "right"
}: SectionNavigationProps) => {
    const [activeSection, setActiveSection] = useState<string>("")
    const [isVisible, setIsVisible] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Afficher le composant après avoir scrollé un peu
            setIsVisible(window.scrollY > 200)

            // Déterminer la section active
            const sectionElements = sections.map(section =>
                document.getElementById(section.id)
            ).filter(Boolean)

            const currentSection = sectionElements.find(element => {
                if (!element) return false
                const rect = element.getBoundingClientRect()
                return rect.top <= 100 && rect.bottom >= 100
            })

            if (currentSection) {
                setActiveSection(currentSection.id)
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Check initial state

        return () => window.removeEventListener('scroll', handleScroll)
    }, [sections])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            const offsetTop = element.offsetTop - 100 // Account for fixed navbar
            window.scrollTo({ top: offsetTop, behavior: 'smooth' })
        }
        setIsExpanded(false)
    }

    if (!isVisible) return null

    return (
        <div className={cn(
            "fixed top-1/2 transform -translate-y-1/2 z-30 transition-all duration-300",
            position === "left" ? "left-6" : "right-6",
            className
        )}>
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden">
                {/* Toggle Button */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full p-3 flex items-center justify-center hover:bg-blue-50 transition-colors duration-200"
                >
                    <Eye className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Sections</span>
                    <ChevronDown className={cn(
                        "w-4 h-4 ml-2 transition-transform duration-200",
                        isExpanded ? "rotate-180" : ""
                    )} />
                </Button>

                {/* Section Links */}
                {isExpanded && (
                    <div className="border-t border-gray-200/50">
                        {sections.map((section, index) => {
                            const isActive = activeSection === section.id
                            const Icon = section.icon

                            return (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={cn(
                                        "w-full p-3 text-left flex items-center space-x-3 transition-all duration-200 hover:bg-blue-50",
                                        isActive ? "bg-blue-100 text-blue-600 border-r-2 border-blue-600" : "text-gray-600"
                                    )}
                                >
                                    {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
                                    <span className="text-sm font-medium truncate">{section.title}</span>

                                    {/* Indicateur de position */}
                                    <div className={cn(
                                        "w-2 h-2 rounded-full ml-auto transition-colors duration-200",
                                        isActive ? "bg-blue-600" : "bg-gray-300"
                                    )} />
                                </button>
                            )
                        })}
                    </div>
                )}

                {/* Progress Indicator */}
                <div className="h-1 bg-gray-200">
                    <div
                        className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
                        style={{
                            width: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%`
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default SectionNavigation
