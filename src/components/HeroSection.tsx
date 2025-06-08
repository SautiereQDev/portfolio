import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface HeroSectionProps {
    title: string
    subtitle: string
    description: string
    ctaText: string
    ctaLink: string
    imageUrl: string
}

export const HeroSection = ({
    title,
    subtitle,
    description,
    ctaText,
    ctaLink,
    imageUrl
}: HeroSectionProps) => {
    const heroRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const descriptionRef = useRef<HTMLParagraphElement>(null)
    const ctaRef = useRef<HTMLAnchorElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const tl = gsap.timeline()        // Animation d'entrée
        tl.from(imageRef.current, {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        })
            .fromTo(titleRef.current, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" }, "-=0.5")
            .fromTo(subtitleRef.current, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" }, "-=0.6")
            .fromTo(descriptionRef.current, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" }, "-=0.4")
            .fromTo(ctaRef.current, { 
                y: 30, 
                autoAlpha: 0, 
                scale: 0.8,
                rotation: -5
            }, { 
                y: 0, 
                autoAlpha: 1, 
                scale: 1,
                rotation: 0,
                duration: 0.7, 
                ease: "back.out(1.7)" 
            }, "-=0.5")

        // Animation parallax sur l'image
        ScrollTrigger.create({
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
                if (imageRef.current) {
                    gsap.to(imageRef.current, {
                        y: self.progress * 100,
                        duration: 0.3,
                        ease: "power2.out"
                    })
                }
            }
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.2)_1px,transparent_0)] bg-[length:50px_50px]"></div>
            </div>

            {/* Overlay pour améliorer la lisibilité */}
            <div className="absolute inset-0 bg-white/60"></div>

            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Contenu textuel */}
                    <div className="space-y-8">
                        <div className="space-y-4">                            <h1
                            ref={titleRef}
                            className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight drop-shadow-lg break-keep whitespace-nowrap"
                        >
                            {title}
                        </h1>
                            <p
                                ref={subtitleRef}
                                className="text-xl md:text-2xl text-black font-bold drop-shadow-md"
                            >
                                {subtitle}
                            </p>
                        </div>                        <p
                            ref={descriptionRef}
                            className="text-lg text-black leading-relaxed max-w-2xl font-medium drop-shadow-sm"
                        >
                            {description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">                            <a
                                ref={ctaRef}
                                href={ctaLink}
                                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden transform-gpu"
                            >
                                <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">{ctaText}</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
                            </a>
                            <a
                                href="/projects"
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-800 bg-white border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 hover:shadow-md"
                            >
                                Voir mes projets
                            </a>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative">
                        <div className="relative z-10">
                            <img
                                ref={imageRef}
                                src={imageUrl}
                                alt="Hero illustration"
                                className="w-full max-w-lg mx-auto h-auto object-contain"
                            />
                        </div>
                        {/* Éléments décoratifs */}
                        <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                        <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
