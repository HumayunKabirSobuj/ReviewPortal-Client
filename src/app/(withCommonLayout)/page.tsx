import HeroSection from "@/components/modules/HomePage/HeroSection";
import HowItWorksSection from "@/components/modules/HomePage/HowItWorksSection";
import ServicesSection from "@/components/modules/HomePage/ServicesSection";
import Banner from "@/components/shared/Banner";

export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen  overflow-hidden ">
      <Banner/>
      <HeroSection />

      <section className="container mx-auto bg-white px-4 md:px-8 lg:px-16 py-8 md:py-12">
        <ServicesSection />

        <HowItWorksSection />
      </section>
    </div>
  );
}
