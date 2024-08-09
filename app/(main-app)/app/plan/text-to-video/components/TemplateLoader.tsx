import React from "react";
import ContentLoader from "react-content-loader";

const TemplateLoader = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height="104px"
    viewBox="0 0 400 104"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="10" ry="10" width="64" height="64" />
    <rect x="80" y="10" rx="10" ry="10" width="200" height="16" />
    <rect x="80" y="40" rx="10" ry="10" width="100" height="20" />
    <rect x="300" y="30" rx="10" ry="10" width="80" height="18" />
  </ContentLoader>
);

export default TemplateLoader;
