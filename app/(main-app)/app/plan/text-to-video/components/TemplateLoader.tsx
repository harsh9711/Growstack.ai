import React from "react"
import ContentLoader from "react-content-loader"

const TemplateLoader = () => (
  <ContentLoader speed={2} width="100%" height="300px" viewBox="0 0 400 280" backgroundColor="#f3f3f3" foregroundColor="#ecebeb">
    <rect x="0" y="0" rx="10" ry="10" width="400" height="204" />
    <rect x="55" y="218" rx="10" ry="10" width="345" height="19" />
    <circle cx="26" cy="228" r="17" />
  </ContentLoader>
);

export default TemplateLoader

