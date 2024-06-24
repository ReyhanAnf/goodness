import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

export default function ProgressAyah() {
  const [scrolled, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;

      const scrollPercent = (scrollY / (documentHeight - windowHeight)) * 100

      setScroll(scrollPercent)
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])
  return (
    <Progress className="absolute left-0 bottom-0" value={scrolled} />
  )
}