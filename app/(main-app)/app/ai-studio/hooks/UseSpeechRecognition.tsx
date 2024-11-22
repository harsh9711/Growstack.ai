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
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  const initializeRecognition = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language;
      recognitionRef.current = recognition;

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onend = () => {
        if (!isRecording) return;
        setIsRecording(false);
        onEndCallback();
      };

      recognition.onerror = (event: any) => {
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
        onEndCallback(); // Trigger the end callback when an error occurs as well
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.trim();
        onResult(transcript);
      };

      return recognition;
    } else {
      toast.error("Speech recognition not supported in this browser.", {
        duration: Infinity,
      });
    }
  };

  useEffect(() => {
    if (isMicOpen) {
      const recognition = initializeRecognition();
      recognition?.start();
    } else {
      stopRecognition();
    }

    // Clean up the recognition instance if the component is unmounted
    return () => {
      stopRecognition();
    };
  }, [isMicOpen, language]);

  const startRecognition = () => {
    if (recognitionRef.current && !isRecording) {
      recognitionRef.current.start();
    }
  };

  const stopRecognition = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
    }
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

  return { isRecording, startRecognition, stopRecognition, textToSpeech };
};

export default useSpeechRecognition;
