"use client";

import React, { useEffect } from "react";
import "@/public/builderjs/dist/builder.css";
import Spinner from "@/components/Spinner";

const DesignPage: React.FC = () => {
  useEffect(() => {
    // Function to load a script and return a promise
    const loadScript = (src: string) => {
      return new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script ${src}`));
        document.body.appendChild(script);
      });
    };

    // Function to load all scripts
    const loadScripts = async () => {
      try {
        // Load builder.js
        await loadScript("/builderjs/dist/builder.js");

        // Load other scripts in sequence
        await loadScript("/builderjs/plugins/rss/RssElement.js");
        await loadScript("/builderjs/plugins/rss/RssControl.js");
        await loadScript("/builderjs/plugins/rss/RssWidget.js");
        await loadScript("/builderjs/scripts/editor.js");
      } catch (error) {
        console.error("Error loading scripts:", error);
      }
    };

    loadScripts();

    // Cleanup function to remove scripts
    return () => {
      const scripts = [
        "/builderjs/dist/builder.js",
        "/builderjs/plugins/rss/RssElement.js",
        "/builderjs/plugins/rss/RssControl.js",
        "/builderjs/plugins/rss/RssWidget.js",
        "/builderjs/scripts/editor.js",
      ];

      scripts.forEach((src) => {
        const script = document.querySelector(`script[src="${src}"]`);
        if (script) {
          document.body.removeChild(script);
        }
      });
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col gap-5 justify-center items-center">
      <Spinner color="black" size={100} />
      Loading...
    </div>
  );
};

export default DesignPage;
