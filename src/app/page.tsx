import BannerSection from "@/components/banner-section";
import Header from "@/components/header/header";
import Plans from "@/components/plans/plans";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-white">
      <Header />
      <BannerSection />
      <Plans />
    </div>
  );
}
