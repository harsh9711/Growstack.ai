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
  onResult: (transcript: string) => void
) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
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
      toast.error("Speech recognition not supported in this browser.");
    }
  }, [language, onResult]);

  const startRecognition = () => {
    if (recognitionRef.current && !isRecording) {
      recognitionRef.current.start();
    }
  };

  const textToSpeech = async (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      window.speechSynthesis.speak(utterance);
    } else {
      toast.error("Text-to-speech not supported in this browser.");
    }
  };

  return { isRecording, startRecognition, textToSpeech };
};

export default useSpeechRecognition;
