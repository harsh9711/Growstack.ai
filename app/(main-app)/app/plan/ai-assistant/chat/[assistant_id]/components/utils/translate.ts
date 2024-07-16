import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TRANSLATION_API_KEY as string;

const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

interface Message {
  prompt: string;
  response: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export const translateText = async (messages: Message[], target: string): Promise<Message[]> => {
  const translate = async (text: string, target: string): Promise<string> => {
    try {
      const response = await axios.post(
        url,
        new URLSearchParams({
          q: text,
          target: target,
          format: "text",
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error("Error translating text:", error);
      return text; // Return the original text in case of an error
    }
  };

  try {
    const translations = await Promise.all(
      messages.map(async (message) => {
        const translatedResponse = await translate(message.response, target);
        const translatedPrompt = await translate(message.prompt, target);

        return {
          ...message,
          response: translatedResponse,
          prompt: translatedPrompt,
        };
      })
    );

    return translations;
  } catch (error) {
    console.error("Error processing translations:", error);
    return messages;
  }
};
