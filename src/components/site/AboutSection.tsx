import Image from 'next/image';

export default function AboutSection() {
  return (
    <section className="bg-brand-dark text-white grid md:grid-cols-2">
      {/* Left Column: Model Image */}
      <div className="relative aspect-[3/4] md:aspect-auto">
        <Image
          src="/images/about-model.webp" // A new model image matching the tone
          alt="Gracy Store Model"
          fill
          className="object-cover"
        />
      </div>

      {/* Right Column: Text and Button */}
      <div className="p-12 md:p-16 lg:p-24 flex flex-col justify-center">
        <h2 className="text-3xl font-light tracking-wide mb-8">No More Firecracker</h2>
        
        <div className="space-y-6 text-sm text-gray-200 leading-relaxed max-w-lg">
          <p>
            Gracy Store is your destination for premium double drawn human hair... 
            (Add the verbatim text from image_0.png here)
          </p>
          <p>
            With excellent density and durability, our collections cater to...
          </p>
          <p>
            Elevate your look with Gracy. Because luxury is in the details.
          </p>
        </div>

        <button className="mt-12 bg-white text-brand-dark px-10 py-3 uppercase text-xs tracking-widest font-bold self-start hover:bg-gray-200 transition">
          Keep Shopping Now!
        </button>
      </div>
    </section>
  );
}