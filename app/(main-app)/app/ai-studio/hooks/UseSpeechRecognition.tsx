import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const useSpeechRecognition = (
  language: string,
  isMicOpen: boolean,
  onResult: (transcript: string) => void,
  onEndCallback: () => void
) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);
  const noSpeechTimeoutRef = useRef<any>(null);
  const silenceTimeoutRef = useRef<any>(null);
  const isSpeakingRef = useRef<boolean>(false);

  const clearTimeouts = () => {
    if (noSpeechTimeoutRef.current) {
      clearTimeout(noSpeechTimeoutRef.current);
      noSpeechTimeoutRef.current = null;
    }
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
  };

  const stopRecording = () => {
    clearTimeouts();
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  useEffect(() => {
    toast.dismiss();
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = language;
      recognitionRef.current = recognition;

      recognition.onstart = () => {
        setIsRecording(true);
        isSpeakingRef.current = false;

        // Set timeout for no speech detection
        noSpeechTimeoutRef.current = setTimeout(() => {
          if (!isSpeakingRef.current) {
            setIsRecording(false);
            onEndCallback();
          }
        }, 4000);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.onaudiostart = () => {
        isSpeakingRef.current = false;
      };

      recognition.onerror = (event: any) => {
        stopRecording();
        setIsRecording(false);
        let errorMessage = "An error occurred.";
        switch (event.error) {
          case "no-speech":
            errorMessage = "No speech detected. Please try again.";
            break;
          case "audio-capture":
            errorMessage = "Microphone not found. Please check your device.";
            break;
          case "not-allowed":
            errorMessage = "Microphone access denied.";
            break;
          default:
            errorMessage = event.error;
        }
        toast.error(errorMessage);
        onEndCallback();
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1];

        // Clear no-speech timeout as we've detected speech
        if (noSpeechTimeoutRef.current) {
          clearTimeout(noSpeechTimeoutRef.current);
          noSpeechTimeoutRef.current = null;
        }

        if (transcript.isFinal) {
          isSpeakingRef.current = true;
          onResult(transcript[0].transcript.trim());

          // Clear existing silence timeout
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current);
          }

          // Set new silence timeout after speech ends
          silenceTimeoutRef.current = setTimeout(() => {
            stopRecording();
            setIsRecording(false);
            onEndCallback();
          }, 1500); // 1.5 seconds of silence to determine speech has ended
        }
      };

      recognition.onspeechstart = () => {
        isSpeakingRef.current = true;
        if (noSpeechTimeoutRef.current) {
          clearTimeout(noSpeechTimeoutRef.current);
          noSpeechTimeoutRef.current = null;
        }
      };

      recognition.onspeechend = () => {
        isSpeakingRef.current = false;
      };
    } else if (isMicOpen) {
      toast.error("Speech recognition not supported in this browser.", {
        duration: Infinity,
      });
    }

    return () => {
      clearTimeouts();
    };
  }, [language, onResult, onEndCallback, isMicOpen]);

  const startRecognition = () => {
    if (recognitionRef.current && !isRecording) {
      clearTimeouts();
      recognitionRef.current.start();
    }
  };

  const stopRecognition = () => {
    stopRecording();
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  };

  const textToSpeech = async (text: string, language = "en-US") => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);

      const loadVoices = () => {
        return new Promise(resolve => {
          let voices = window.speechSynthesis.getVoices();
          if (voices.length) {
            resolve(voices);
          } else {
            window.speechSynthesis.onvoiceschanged = () => {
              voices = window.speechSynthesis.getVoices();
              resolve(voices);
            };
          }
        });
      };

      const voices: any = await loadVoices();
      const googleFemaleVoice = voices.find(
        (voice: any) =>
          voice.name.includes("Google") && voice.name.includes("Female")
      );

      if (googleFemaleVoice) {
        utterance.voice = googleFemaleVoice;
      }

      utterance.lang = language;
      utterance.onend = () => {
        onEndCallback();
      };

      window.speechSynthesis.speak(utterance);
    } else {
      toast.error("Text-to-speech not supported in this browser.");
    }
  };

  useEffect(() => {
    if (isMicOpen) {
      startRecognition();
    } else {
      stopRecognition();
    }
  }, [isMicOpen]);

  return { isRecording, startRecognition, stopRecognition, textToSpeech };
};

export default useSpeechRecognition;
