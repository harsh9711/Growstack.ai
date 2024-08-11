"use client";
import Script from "next/script";
import "../../../../../../public/builderjs/dist/builder.css";
import Spinner from "@/components/Spinner";

const DesignPage = () => {
  return (
    <div>
      <div className="flex-1 flex flex-col gap-5 justify-center items-center">
        <Spinner color="black" size={100} />
        Loading...
      </div>w

      <Script src="/builderjs/dist/builder.js" strategy="afterInteractive" />
      <Script src="/builderjs/plugins/rss/RssElement.js" strategy="afterInteractive" />
      <Script src="/builderjs/plugins/rss/RssControl.js" strategy="afterInteractive" />
      <Script src="/builderjs/plugins/rss/RssWidget.js" strategy="afterInteractive" />
      <Script src="/builderjs/scripts/editor.js" strategy="afterInteractive" />
    </div>
  );
};

export default DesignPage;
