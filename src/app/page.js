'use client';

import AboutSection from "@/Components/AboutSection/AboutSection";
import Banner from "@/Components/Banner/Banner";
import SkillSection from "@/Components/SkillSection/SkillSection";

export default function AnimatedBox() {
  return (
    <div>
      <Banner />
      <AboutSection />
      <SkillSection />
    </div>
  );
}