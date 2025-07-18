import { AboutUs } from "@/components/landing/about-us";
import { CallToAction } from "@/components/landing/cta";
import { FAQs } from "@/components/landing/faqs";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";

export default function Home() {
  return (
    <div className="h-dvh overflow-y-auto">
      <Header />
      <Hero />
      <Features />
      <AboutUs />
      <CallToAction />
      <FAQs />
      <Footer />
    </div>
  );
}
