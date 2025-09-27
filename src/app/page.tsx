import BannerSection from "@/components/banner-section";
import Header from "@/components/header/header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-white">
      <Header />
      <BannerSection />
    </div>
  );
}
