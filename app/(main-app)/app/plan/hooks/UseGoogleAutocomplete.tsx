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
    console.log("Debugggginnggg11::UseGoogleAutocomplete useEffect triggered");

    window.initAutocomplete = () => {
      if (!autocompleteInputRef.current) {
        console.error(
          "Debugggginnggg22::Autocomplete input reference is not set"
        );
        return;
      }
      console.log("Debugggginnggg33::Initializing Google Autocomplete");
      const autocomplete = new google.maps.places.Autocomplete(
        autocompleteInputRef.current,
        {
          types: ["(regions)"],
        }
      );

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place) {
          const result = place?.formatted_address || ""
          console.log("Debugggginnggg44::Place selected:", result);
          setInputCountry(result);
        } else {
          console.warn("Debugggginnggg55::No place selected");
        }
      });
    };

    if (!scriptRef.current) {
      console.log("Debugggginnggg66::Creating Google Maps script element");
      scriptRef.current = document.createElement("script");
      scriptRef.current.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initAutocomplete`;
      scriptRef.current.async = true;
      scriptRef.current.defer = true;
      scriptRef.current.onload = () => {
        console.log("Debugggginnggg77::Google Maps script loaded successfully");
      };
      scriptRef.current.onerror = () => {
        console.error("Debugggginnggg88::Error loading Google Maps script");
      };
      document.body.appendChild(scriptRef.current);
    }

    return () => {
      if (scriptRef.current && document.body.contains(scriptRef.current)) {
        console.log("Debugggginnggg99::Removing Google Maps script element");
        document.body.removeChild(scriptRef.current);
      }
      window.initAutocomplete = () => {};
    };
  }, [apiKey]);

  return { autocompleteInputRef };
};

export default UseGoogleAutocomplete;
