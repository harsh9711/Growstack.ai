"use client";
import Head from "next/head";
import Script from "next/script";
import "../../../../../../public/dist/builder.css";

const DesignPage = () => {
  return (
    <div>
      <div style={{ textAlign: "center", height: "100vh", verticalAlign: "middle", padding: "auto", display: "flex" }}>
        <div style={{ margin: "auto" }} className="lds-dual-ring"></div>
      </div>

      <Script src="/dist/builder.js" strategy="afterInteractive" />
      <Script src="/plugins/rss/RssElement.js" strategy="afterInteractive" />
      <Script src="/plugins/rss/RssControl.js" strategy="afterInteractive" />
      <Script src="/plugins/rss/RssWidget.js" strategy="afterInteractive" />
      <Script src="/scripts/editor.js" strategy="afterInteractive" />

      <style jsx>{`
        .lds-dual-ring {
          display: inline-block;
          width: 80px;
          height: 80px;
        }
        .lds-dual-ring:after {
          content: " ";
          display: block;
          width: 30px;
          height: 30px;
          margin: 4px;
          border-radius: 80%;
          border: 2px solid #aaa;
          border-color: #007bff transparent #007bff transparent;
          animation: lds-dual-ring 1.2s linear infinite;
        }
        @keyframes lds-dual-ring {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default DesignPage;
