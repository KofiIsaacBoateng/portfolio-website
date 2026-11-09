"use client";

import { useCallback, useState } from "react";
import Intro from "./Intro";
import Hero from "../sections/Hero";

export default function IntroController() {
  const [introComplete, setIntroComplete] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <>
      {/** Hero */}
      <Hero />

      {!introComplete && <Intro onComplete={handleIntroComplete} />}

      {/* We'll render the main portfolio here later */}
    </>
  );
}
