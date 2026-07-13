import About from "@/components/landing/about";
import Contact from "@/components/landing/contact";
import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import Navbar from "@/components/landing/navbar";
import Section from "@/components/landing/section";
import { getVehicles } from "@/data/actions/vehicle";

const HomePage = async () => {
  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center bg-fixed bg-no-repeat"
      style={{ backgroundImage: "url('/pic10.jpg')" }}
    >
      <Navbar />

      <main className="flex-1">
        <Hero />
        <Features />
        <About />
        <Contact />
        <Section />
        <Footer />
      </main>
    </div>
  );
};

export default HomePage;
