"use client"

import { CardTitle, CardDescription } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function MetaSurah() {
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
    <>
      <CardTitle>Surah Alfatihah</CardTitle>
      <CardDescription className="mb-10">Makkiyah</CardDescription>
      <Progress value={scrolled} />
    </>
  )
}