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
  isMicOpen : any,
  onResult: (transcript: string) => void,
  onEndCallback: () => void
) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    toast.dismiss();
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
        setIsRecording(false);
      };

      recognition.onerror = (event: any) => {
        setIsRecording(false);
        toast.error(event.error);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
      };
    } else {
      if(isMicOpen){
        toast.error("Speech recognition not supported in this browser.", { duration: Infinity });
      }
    }
  }, [language, onResult, onEndCallback, isMicOpen]);

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
        return new Promise((resolve) => {
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
