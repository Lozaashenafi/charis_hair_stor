import Image from 'next/image';

export default function HeroBanner() {
  return (
      <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-br from-[#7a6d63] via-[#8b6f47] to-[#5d4e42]">
        <div className="absolute inset-0">
          <Image
            src="/banner.JPG"
            alt="Charis Hair Store Hero"
            fill
            className="object-cover opacity-50"
            priority
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#5d4e42] via-[#8b6f47]/40 to-transparent"></div>

        <div className="relative h-full container mx-auto px-4 flex items-center">
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-64 h-80 md:w-72 md:h-96">
                <Image
                  src="/banner.JPG"
                  alt="Charis Store Woman"
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                  priority
                />
              </div>
            </div>

            <div className="w-full md:w-1/2 text-center md:text-right z-10">
              
              <h1 className="text-4xl md:text-6xl font-bold text-[#f5f1ed] mb-3 drop-shadow-lg">
                CHARIS
              </h1>
              <h2 className="text-2xl md:text-4xl font-bold text-[#d4a574] mb-6 drop-shadow-lg">
                STORE
              </h2>
              <p className="text-[#f5f1ed] text-lg md:text-2xl font-light tracking-widest mb-8 drop-shadow">
                WORLD WIDE SHIPPING
              </p>

            </div>
          </div>
        </div>
      </section>
  );
}