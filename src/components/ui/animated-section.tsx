import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface AnimatedSectionProps {
    children: React.ReactNode
    className?: string
    animation?: "fadeIn" | "slideUp" | "slideInLeft" | "slideInRight" | "scale"
    delay?: number
    duration?: number
}

export const AnimatedSection = ({
    children,
    className = "",
    animation = "fadeIn",
    delay = 0,
    duration = 1
}: AnimatedSectionProps) => {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const element = sectionRef.current
        if (!element) return

        // Animation initiale
        const initialState = {
            opacity: 0,
            y: animation === "slideUp" ? 50 : 0,
            x: animation === "slideInLeft" ? -50 : animation === "slideInRight" ? 50 : 0,
            scale: animation === "scale" ? 0.8 : 1,
        }

        gsap.set(element, initialState)

        // Animation au scroll
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        })

        tl.to(element, {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration,
            delay,
            ease: "power2.out"
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [animation, delay, duration])

    return (
        <div ref={sectionRef} className={className}>
            {children}
        </div>
    )
}
