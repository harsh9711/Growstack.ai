"use client";

import React, { useEffect } from "react";
import "@/public/builderjs/dist/builder.css";
import Spinner from "@/components/Spinner";

const DesignPage: React.FC = () => {
  useEffect(() => {
    // Function to load scripts
    const loadScripts = async () => {
      try {
        // Load builder.js script
        const builderScript = document.createElement("script");
        builderScript.src = "/builderjs/dist/builder.js";
        builderScript.async = true;
        document.body.appendChild(builderScript);

        // Wait for builder.js to load
        await new Promise<void>((resolve, reject) => {
          builderScript.onload = () => resolve();
          builderScript.onerror = (error) => reject(error);
        });

        // rss scripts
        const rssElementScript = document.createElement("script");
        rssElementScript.src = "/builderjs/plugins/rss/RssElement.js";
        rssElementScript.async = true;
        document.body.appendChild(rssElementScript);

        await new Promise<void>((resolve, reject) => {
          rssElementScript.onload = () => resolve();
          rssElementScript.onerror = (error) => reject(error);
        });

        const rssControlScript = document.createElement("script");
        rssControlScript.src = "/builderjs/plugins/rss/RssControl.js";
        rssControlScript.async = true;
        document.body.appendChild(rssControlScript);

        await new Promise<void>((resolve, reject) => {
          rssControlScript.onload = () => resolve();
          rssControlScript.onerror = (error) => reject(error);
        });

        const rssWidgetScript = document.createElement("script");
        rssWidgetScript.src = "/builderjs/plugins/rss/RssWidget.js";
        rssWidgetScript.async = true;
        document.body.appendChild(rssWidgetScript);

        await new Promise<void>((resolve, reject) => {
          rssWidgetScript.onload = () => resolve();
          rssWidgetScript.onerror = (error) => reject(error);
        });

        // Load editor.js script
        const editorScript = document.createElement("script");
        editorScript.src = "/builderjs/scripts/editor.js";
        editorScript.async = true;
        document.body.appendChild(editorScript);

        // Wait for editor.js to load
        await new Promise<void>((resolve, reject) => {
          editorScript.onload = () => resolve();
          editorScript.onerror = (error) => reject(error);
        });
      } catch (error) {
        console.error("Error loading scripts:", error);
      }
    };

    loadScripts();

    // Cleanup function to remove scripts
    return () => {
      document.querySelectorAll('script[src="/builderjs/dist/builder.js"], script[src="/builderjs/scripts/editor.js"]').forEach((script) => {
        document.body.removeChild(script);
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
