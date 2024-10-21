import React from "react";
import ContentLoader from "react-content-loader";

const WorkflowLoader = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height="300px"
    viewBox="0 0 400 280"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="10" ry="10" width="400" height="178" />
    <rect x="0" y="190" rx="10" ry="10" width="400" height="19" />
    <rect x="0" y="220" rx="10" ry="10" width="325" height="19" />
  </ContentLoader>
);

export default WorkflowLoader;
