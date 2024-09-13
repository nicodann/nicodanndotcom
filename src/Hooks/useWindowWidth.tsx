import { useEffect, useState } from "react";

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    // height: window.innerHeight,
  });
  const [screenSize, setScreenSize] = useState<'base' |'sm' | 'md' | 'lg' | 'xl'>()

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        // height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowDimensions.width < 640) {
      setScreenSize('base')
    } else if (windowDimensions.width >= 640 && windowDimensions.width < 768) {
      setScreenSize('sm')
    } else if (windowDimensions.width >= 768 && windowDimensions.width < 1024) {
      setScreenSize('md')
    } else if (windowDimensions.width >= 1024 && windowDimensions.width < 1280) {
      setScreenSize('lg')
    } else if (windowDimensions.width >= 1280) {
      setScreenSize('xl')
    }    
  }, [windowDimensions]);

  return screenSize;
}
