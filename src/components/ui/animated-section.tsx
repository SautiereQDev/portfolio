import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeIn" | "slideUp" | "slideInLeft" | "slideInRight" | "scale";
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export const AnimatedSection = ({
  children,
  className = "",
  animation = "fadeIn",
  delay = 0,
  duration = 0.8,
  threshold = 0.3,
  once = true,
}: AnimatedSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    // Définir l'état initial en fonction de l'animation
    let initialX = 0;
    if (animation === "slideInLeft") {
      initialX = -30;
    } else if (animation === "slideInRight") {
      initialX = 30;
    }

    const initialState = {
      opacity: 0,
      y: animation === "slideUp" ? 30 : 0,
      x: initialX,
      scale: animation === "scale" ? 0.95 : 1,
    };

    // Appliquer l'état initial immédiatement
    gsap.set(element, initialState);

    // Créer l'animation avec ScrollTrigger
    const tl = gsap.timeline({
      paused: true,
    });

    tl.to(element, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      duration,
      delay,
      ease: "power2.out",
    });

    // Configuration du ScrollTrigger
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: `top ${80 + threshold * 20}%`,
      onEnter: () => {
        if (!isVisible || !once) {
          setIsVisible(true);
          tl.play();
        }
      },
      onEnterBack: () => {
        if (!once && !isVisible) {
          setIsVisible(true);
          tl.play();
        }
      },
      onLeave: () => {
        if (!once) {
          setIsVisible(false);
          tl.reverse();
        }
      },
      onLeaveBack: () => {
        if (!once) {
          setIsVisible(false);
          tl.reverse();
        }
      },
    });

    return () => {
      trigger.kill();
      tl.kill();
    };
  }, [animation, delay, duration, threshold, once, isVisible]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
};
