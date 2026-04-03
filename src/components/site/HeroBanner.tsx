import Image from 'next/image';

export default function HeroBanner() {
  return (
    <section className="relative aspect-[21/9] w-full overflow-hidden bg-white">
      {/* Main image of the model */}
      <Image
        src="/images/main-banner.webp" // Generate this new model image
        alt="Model showcasing luxurious hair"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Text & Logo Overlays (Positioned to match layout) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-12">
        <div className="text-center">
          <Image
            src="/images/gracy-logo-main.webp" // This logo (from the center in image_0.png)
            alt="Gracy Store"
            width={400} height={150}
            className="mb-2"
          />
          <p className="text-white text-sm uppercase tracking-[.3em]">WORLD WIDE SHIPPING</p>
        </div>
      </div>

      {/* Floating Shopping Bag with 20% off Tag */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-80 max-w-[30%]">
        <Image
          src="/images/bag.webp" // Generate a clean image of a black bag
          alt="Shopping Bag"
          width={320} height={380}
          className="object-contain"
        />
        <div className="absolute bottom-10 left-5 bg-white border border-gray-300 rounded p-2 flex flex-col items-center">
           <span className="text-xl font-bold">20%</span>
           <span className="text-xs uppercase text-gray-500">off</span>
        </div>
      </div>
    </section>
  );
}