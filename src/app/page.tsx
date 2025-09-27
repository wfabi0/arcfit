import AboutSection from "@/components/about-section";
import BannerSection from "@/components/banner-section";
import FeaturesSection from "@/components/features-section";
import Header from "@/components/header/header";
import PlansSection from "@/components/plans-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-white">
      <Header />
      <BannerSection />
      <AboutSection />
      <PlansSection />
      <FeaturesSection />
    </div>
  );
}
