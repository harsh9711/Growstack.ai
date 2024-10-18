import { useEffect, useState } from "react";

const useInView = (options?: IntersectionObserverInit) => {
  const [isInView, setIsInView] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    const element = document.querySelector("#grid-component");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return isInView;
};

export default useInView;
