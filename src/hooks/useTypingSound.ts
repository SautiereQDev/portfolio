import { useCallback, useRef } from "react";

interface TypingSoundOptions {
  enabled?: boolean;
  volume?: number;
  pitch?: number;
  variation?: boolean; // Adds pitch variation for more natural sound
}

/**
 * Custom hook for generating typing sound effects
 * Creates synthetic typing sounds using Web Audio API
 */
export const useTypingSound = (options: TypingSoundOptions = {}) => {
  const {
    enabled = false, // Disabled by default to avoid unwanted sound
    volume = 0.1,
    pitch = 800,
    variation = true,
  } = options;

  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current && enabled) {
      try {
        audioContextRef.current = new (window.AudioContext ||
          (
            window as typeof window & {
              webkitAudioContext: typeof AudioContext;
            }
          ).webkitAudioContext)();
      } catch (error) {
        console.warn("Web Audio API not supported:", error);
      }
    }
    return audioContextRef.current;
  }, [enabled]);

  const playTypingSound = useCallback(
    (character?: string) => {
      if (!enabled) return;

      const audioContext = initAudioContext();
      if (!audioContext) return;

      try {
        // Create oscillator for the typing sound
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        // Connect nodes
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Configure sound
        let frequency = pitch;

        if (variation) {
          // Add natural variation based on character type
          if (character === " ") {
            frequency *= 0.7; // Lower pitch for spaces
          } else if (/[.!?]/.test(character || "")) {
            frequency *= 1.2; // Higher pitch for punctuation
          } else {
            frequency *= 0.9 + Math.random() * 0.2; // Random variation
          }
        }

        oscillator.frequency.setValueAtTime(
          frequency,
          audioContext.currentTime
        );
        oscillator.type = "square";

        // Configure volume envelope
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(
          volume,
          audioContext.currentTime + 0.01
        );
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.1
        );

        // Play sound
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (error) {
        console.warn("Error playing typing sound:", error);
      }
    },
    [enabled, volume, pitch, variation, initAudioContext]
  );

  const cleanup = useCallback(() => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  }, []);

  return {
    playTypingSound,
    cleanup,
    isEnabled: enabled,
  };
};
