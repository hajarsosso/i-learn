import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import HeroSection from "../components/home/HeroSection";
import CoursesSection from "../components/home/CoursesSection";
import StudentExperienceSection from "../components/home/StudentExperienceSection";
import AboutSection from "../components/home/AboutSection";
import PartnersSection from "../components/home/PartnersSection";

export default function HomePage() {
  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <Navbar />

      <HeroSection />

      <AboutSection />

      <StudentExperienceSection />

      <CoursesSection />

      <PartnersSection />

      <Footer />
    </div>
  );
}