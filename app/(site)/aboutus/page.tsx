import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#9c826c] flex items-center justify-center p-4 md:p-12 lg:p-24">
      {/* Container holding both Image and Text */}
      <div className="max-w-6xl w-full flex flex-col md:flex-row shadow-2xl overflow-hidden border border-black/10">
        
        {/* Left Side: Portrait Image */}
        <div className="w-full md:w-1/2 relative aspect-[4/5] md:aspect-auto h-[500px] md:h-auto">
          <Image
            src="/about-portrait.png" // Change this to your actual file name
            alt="Founder of Charis Store"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side: Text Content */}
        <div className="w-full md:w-1/2 bg-[#2d1f19] p-8 md:p-16 flex flex-col justify-center text-[#d1c2b5]">
          <h1 className="text-3xl md:text-4xl font-medium text-white mb-8 tracking-tight">
         About Charis Store
          </h1>

          <div className="space-y-6 text-sm leading-relaxed font-light">
            <p>Charis Store Luxury Human Hair for the Modern Beauty.</p>
            
            <p>
              We have <span className="font-bold">6 Month guaranty</span> & free delivery in <span className="font-bold">Canada and USA</span>.
            </p>

            <p>
              At Charis Store, we believe that confidence starts with flawless hair. 
              We provide premium, ethically sourced 100% human hair extensions, 
              wigs, and bundles designed for effortless beauty, versatility, and long-lasting wear. 
              Whether you want natural volume, sleek length, or bold transformations, 
              our high-quality hair blends seamlessly for a flawless finish.
            </p>

            <p>
              Crafted for style and durability, our collections cater to every texture and 
              preference curly, straight, wavy, or custom-colored. We take pride in 
              exceptional quality, professional grade products, and unmatched customer service, 
              ensuring you get salon worthy hair every time.
            </p>

            <p>
              Elevate your look with Charis store because luxury is in the details.
            </p>
          </div>

          <div className="mt-12">
            <Link 
              href="/products" 
              className="inline-block bg-[#9c8d86] text-[#2d1f19] px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors duration-300 shadow-lg"
            >
              Keep shining Now!
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}