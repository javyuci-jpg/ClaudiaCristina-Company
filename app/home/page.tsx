import Hero from "../components/Hero";
import About from "../components/About";
import Header from "../components/Header";
import Services from "../components/Services";
import GalleryPreview from "../components/GalleryPreview";
import Testimonials from "../components/Testimonials";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Services />
      <GalleryPreview />

      <div className="text-center my-10">
        <Link
          href="/GaleriaPage"
          className="text-blue-600 underline hover:text-blue-800"
        >
        </Link>
      </div>

      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  );
}

