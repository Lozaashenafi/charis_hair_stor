import Image from 'next/image';

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const productsData: Product[] = [
  {
    id: 1,
    name: "Body Wave - Double Drawn 13x4",
    price: "349,00 PLN",
    image: "https://images.unsplash.com/photo-1595475241929-309d9a0c76d8?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Deep Wave Luxury Bundle",
    price: "323,00 PLN",
    image: "https://images.unsplash.com/photo-1620331311520-246422ff83f9?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Straight Silk Human Hair",
    price: "299,00 PLN",
    image: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Kinky Curly Frontal Wig",
    price: "420,00 PLN",
    image: "https://images.unsplash.com/photo-1522336572468-97b06e8ef143?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Loose Wave Caribbean Series",
    price: "360,00 PLN",
    image: "https://images.unsplash.com/photo-1552046122-03184de85e08?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Honey Blonde Highlights 5x5",
    price: "390,00 PLN",
    image: "https://images.unsplash.com/photo-1610432240166-41f23758b901?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Natural Black Pixie Cut",
    price: "195,00 PLN",
    image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=500&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Burgundy Red Body Wave",
    price: "410,00 PLN",
    image: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=500&auto=format&fit=crop"
  }
];

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {productsData.map((product) => (
        <div key={product.id} className="bg-brand-dark p-1 group">
          <div className="aspect-[4/5] relative overflow-hidden mb-3">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="text-center px-1">
            <h3 className="text-sm font-medium mb-1 line-clamp-1">{product.name}</h3>
            <p className="text-brand-gold text-xs">From {product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}