import { useEffect, RefObject, useRef } from "react";
import { gsap } from "gsap";
import { ANIMATION_EASES } from "../constants";
import { useTypingSound } from "./useTypingSound";

interface TypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  cursorBlinkSpeed?: number;
  cursorChar?: string;
  naturalTyping?: boolean; // Adds natural variations in typing speed
  pauseOnPunctuation?: number; // Pause duration on punctuation
  pauseOnSpace?: number; // Pause duration on spaces
  revealEffect?: boolean; // Adds a reveal effect to each character
  soundEnabled?: boolean; // Enable typing sounds
  onComplete?: () => void;
  onCharacterTyped?: (char: string, index: number) => void;
}

/**
 * Custom hook for typewriter effect using GSAP
 * Creates a realistic typing animation with blinking cursor
 */
export const useTypewriterEffect = (
  elementRef: RefObject<HTMLElement | null>,
  options: TypewriterOptions
) => {
  const {
    text,
    speed = 0.05,
    delay = 0,
    cursorBlinkSpeed = 0.8,
    cursorChar = "|",
    naturalTyping = true,
    pauseOnPunctuation = 0.3,
    pauseOnSpace = 0.1,
    revealEffect = true,
    soundEnabled = false,
    onComplete,
    onCharacterTyped,
  } = options;

  // Use a ref to track if the animation has already run
  const animationHasRun = useRef(false);

  // Initialize typing sound hook
  const { playTypingSound } = useTypingSound({
    enabled: soundEnabled,
    volume: 0.05,
    pitch: 1200,
    variation: true,
  });

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !text) return;

    // Skip if animation has already run
    if (animationHasRun.current) return;

    // Mark animation as having run
    animationHasRun.current = true;

    // Clear any existing content
    element.innerHTML = "";

    // Add typewriter container class to main element
    element.classList.add("typewriter-container");

    // Create a span for the text, cursor, and progress indicator
    const textSpan = document.createElement("span");
    const cursorSpan = document.createElement("span");
    const progressSpan = document.createElement("span"); // Changed from div to span

    // Configure text span to preserve spaces and prevent line breaks
    textSpan.style.whiteSpace = "pre";
    textSpan.style.display = "inline";
    textSpan.style.wordBreak = "keep-all";
    textSpan.style.lineHeight = "inherit";
    textSpan.style.verticalAlign = "baseline";

    cursorSpan.textContent = cursorChar;
    cursorSpan.className = "typewriter-cursor";
    // Force cursor to stay inline and prevent line breaks - Ultra strict positioning
    cursorSpan.style.display = "inline";
    cursorSpan.style.whiteSpace = "nowrap";
    cursorSpan.style.margin = "0";
    cursorSpan.style.padding = "0";
    cursorSpan.style.verticalAlign = "baseline";
    cursorSpan.style.lineHeight = "inherit";
    cursorSpan.style.position = "relative";
    cursorSpan.style.float = "none";
    cursorSpan.style.clear = "none";
    cursorSpan.style.width = "auto";
    cursorSpan.style.height = "auto";
    cursorSpan.style.overflow = "visible";

    progressSpan.className = "typewriter-progress";
    progressSpan.style.width = "0%";
    progressSpan.style.position = "absolute";
    progressSpan.style.bottom = "-4px";
    progressSpan.style.left = "0";
    progressSpan.style.height = "2px";
    progressSpan.style.display = "block";

    // Create a wrapper to keep text and cursor inline
    const inlineWrapper = document.createElement("span");
    inlineWrapper.className = "typewriter-inline-wrapper";
    inlineWrapper.style.display = "inline";
    inlineWrapper.style.whiteSpace = "nowrap";
    inlineWrapper.style.position = "relative";
    inlineWrapper.style.verticalAlign = "baseline";

    // Add elements in correct order - text and cursor in wrapper, progress absolute
    inlineWrapper.appendChild(textSpan);
    inlineWrapper.appendChild(cursorSpan);

    element.appendChild(inlineWrapper);
    element.appendChild(progressSpan);

    // Timeline for the complete animation
    const tl = gsap.timeline({ delay });

    // Make element visible and start cursor blinking with enhanced effect
    tl.set(element, { opacity: 1 }).set(cursorSpan, { opacity: 1 });

    const cursorAnimation = gsap.to(cursorSpan, {
      opacity: 0,
      duration: cursorBlinkSpeed / 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    // Enhanced typewriter effect with natural variations
    let currentIndex = 0;

    const typeNextCharacter = () => {
      if (currentIndex >= text.length) {
        // Animation complete - hide progress and cursor avec délai réduit
        gsap.to(progressSpan, {
          opacity: 0,
          duration: 0.5,
          ease: ANIMATION_EASES.POWER2_OUT,
        });

        // Cursor disparaît plus rapidement (1 seconde au lieu de 1.5)
        gsap.delayedCall(1.0, () => {
          cursorAnimation.kill();
          gsap.to(cursorSpan, {
            opacity: 0,
            scale: 0,
            duration: 0.3,
            ease: ANIMATION_EASES.POWER2_OUT,
            onComplete: () => {
              // Hide cursor completely without removing from DOM to prevent layout shift
              cursorSpan.style.display = "none";
              cursorSpan.style.width = "0";
              cursorSpan.style.height = "0";
              cursorSpan.style.margin = "0";
              cursorSpan.style.padding = "0";
            },
          });
        });

        if (onComplete) {
          onComplete();
        }
        return;
      }

      const char = text[currentIndex];

      // Gestion spéciale des espaces pour les préserver
      if (char === " ") {
        // Ajouter un espace non-sécable pour préserver l'espacement
        const spaceChar = document.createElement("span");
        spaceChar.innerHTML = "&nbsp;"; // Espace non-sécable
        spaceChar.className = "typewriter-char";

        if (revealEffect) {
          spaceChar.style.opacity = "0";
        }

        textSpan.appendChild(spaceChar);

        if (revealEffect) {
          gsap.to(spaceChar, {
            opacity: 1,
            duration: 0.1,
            ease: "power2.out",
          });
        }
      } else {
        // Caractère normal avec révélation
        const newChar = document.createElement("span");
        newChar.textContent = char;
        newChar.className = "typewriter-char";

        if (revealEffect) {
          newChar.style.opacity = "0";
          newChar.style.transform = "translateY(10px)";
        }

        textSpan.appendChild(newChar);

        if (revealEffect) {
          gsap.to(newChar, {
            opacity: 1,
            y: 0,
            duration: 0.25,
            ease: "back.out(1.7)",
          });
        }
      }

      // Update progress indicator après traitement du caractère
      const progress = ((currentIndex + 1) / text.length) * 100;
      gsap.to(progressSpan, {
        width: `${progress}%`,
        duration: 0.3,
        ease: "power2.out",
      });

      // Call character typed callback and play sound
      if (onCharacterTyped) {
        onCharacterTyped(char, currentIndex);
      }

      // Play typing sound if enabled
      if (soundEnabled) {
        playTypingSound(char);
      }

      currentIndex++;

      // Calculate next delay with natural variations
      let nextDelay = speed;

      if (naturalTyping) {
        // Add random variation (±30% of base speed)
        nextDelay *= 0.7 + Math.random() * 0.6;

        // Longer pauses for punctuation
        if (/[.!?;:]/.test(char)) {
          nextDelay += pauseOnPunctuation;
        }
        // Shorter pauses for spaces
        else if (char === " ") {
          nextDelay += pauseOnSpace;
        }
        // Slightly longer for commas
        else if (char === ",") {
          nextDelay += pauseOnPunctuation * 0.5;
        }
      }

      gsap.delayedCall(nextDelay, typeNextCharacter);
    };

    // Start typing
    gsap.delayedCall(0.3, typeNextCharacter);

    return () => {
      tl.kill();
      cursorAnimation.kill();
      gsap.killTweensOf(cursorSpan);
    };
  }, [
    elementRef,
    text,
    speed,
    delay,
    cursorBlinkSpeed,
    cursorChar,
    naturalTyping,
    pauseOnPunctuation,
    pauseOnSpace,
    revealEffect,
    soundEnabled,
    onComplete,
    onCharacterTyped,
    playTypingSound,
  ]);
};

/**
 * Enhanced typewriter hook with multiple text lines support
 */
export const useMultiLineTypewriter = (
  refs: RefObject<HTMLElement | null>[],
  texts: string[],
  options?: {
    speed?: number;
    delayBetweenLines?: number;
    initialDelay?: number;
    onComplete?: () => void;
  }
) => {
  const {
    speed = 0.05,
    delayBetweenLines = 0.5,
    initialDelay = 0,
    onComplete,
  } = options || {};

  useEffect(() => {
    if (refs.length !== texts.length) return;

    const tl = gsap.timeline({ delay: initialDelay });
    let currentDelay = 0;

    refs.forEach((ref, index) => {
      const element = ref.current;
      const text = texts[index];

      if (!element || !text) return;

      // Clear content
      element.innerHTML = "";

      // Create spans
      const textSpan = document.createElement("span");
      const cursorSpan = document.createElement("span");

      cursorSpan.textContent = "|";
      cursorSpan.className = "typewriter-cursor";

      element.appendChild(textSpan);
      element.appendChild(cursorSpan);

      // Add to timeline
      tl.call(
        () => {
          // Start cursor for this element
          gsap.set(cursorSpan, { opacity: 1 });
          gsap.to(cursorSpan, {
            opacity: 0,
            duration: 0.4,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
          });
        },
        undefined,
        currentDelay
      ).to(
        textSpan,
        {
          duration: text.length * speed,
          ease: "none",
          onUpdate() {
            const progress = this.progress();
            const currentLength = Math.floor(progress * text.length);
            textSpan.textContent = text.substring(0, currentLength);
          },
          onComplete: () => {
            // Stop cursor blinking for this element
            gsap.killTweensOf(cursorSpan);
            gsap.to(cursorSpan, {
              opacity: 0,
              duration: 0.3,
              ease: ANIMATION_EASES.POWER2_OUT,
            });
          },
        },
        currentDelay
      );

      currentDelay += text.length * speed + delayBetweenLines;
    });

    if (onComplete) {
      tl.call(onComplete, undefined, currentDelay);
    }

    return () => {
      tl.kill();
      refs.forEach((ref) => {
        const cursor = ref.current?.querySelector(".typewriter-cursor");
        if (cursor) {
          gsap.killTweensOf(cursor);
        }
      });
    };
  }, [refs, texts, speed, delayBetweenLines, initialDelay, onComplete]);
};
