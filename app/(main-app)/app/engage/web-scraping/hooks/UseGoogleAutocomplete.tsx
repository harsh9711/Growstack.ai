// components/UseGoogleAutocomplete.tsx

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    initAutocomplete: () => void;
  }
}

interface UseGoogleAutocompleteProps {
  setInputCountry: (country: string) => void;
}

const UseGoogleAutocomplete = ({
  setInputCountry,
}: UseGoogleAutocompleteProps) => {
  const apiKey = process.env.NEXT_PUBLIC_PLACES_AUTO_COMPLETE;
  const autocompleteInputRef = useRef<HTMLInputElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (!apiKey) {
      console.error("API key is missing");
      return;
    }

    const loadScript = () => {
      if (scriptRef.current) return;

      scriptRef.current = document.createElement("script");
      scriptRef.current.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initAutocomplete`;
      scriptRef.current.async = true;
      scriptRef.current.defer = true;
      scriptRef.current.onload = () => {
        console.log("Google Maps script loaded successfully");
      };
      scriptRef.current.onerror = () => {
        console.error("Error loading Google Maps script");
      };
      document.body.appendChild(scriptRef.current);
    };

    window.initAutocomplete = () => {
      if (!autocompleteInputRef.current) {
        console.error("Autocomplete input reference is not set");
        return;
      }
      const autocomplete = new google.maps.places.Autocomplete(
        autocompleteInputRef.current,
        {
          types: ["(regions)"],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place && place.formatted_address) {
          const result = place.formatted_address;
          setInputCountry(result);
        } else {
          console.warn("No place selected");
        }
      });
    };

    if (typeof window !== "undefined") {
      loadScript();
    }

    return () => {
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        document.body.removeChild(scriptRef.current);
      }
      window.initAutocomplete = () => {};
    };
  }, [apiKey]);

  return { autocompleteInputRef };
};

export default UseGoogleAutocomplete;
