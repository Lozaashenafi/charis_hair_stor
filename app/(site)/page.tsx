import Header from '@/components/site/Header';
import HeroBanner from '@/components/site/HeroBanner';
import ProductGrid from '@/components/site/ProductGrid';
import AboutSection from '@/components/site/AboutSection';
import Footer from '@/components/site/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      {/* <HeroBanner />
      
      <section className="bg-brand-dark px-6 py-12 md:px-16 md:py-16 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-lg md:text-xl font-medium tracking-wide">
              "Double drawn Human Hair" ~ "We Ship Worldwide" 🌍 
            </h2>
          </div>
          <ProductGrid />
        </div>
      </section>

      <AboutSection />
      <Footer /> */}
    </main>
  );
}