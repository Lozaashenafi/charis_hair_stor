import { getAdminProducts } from "@/services/product.service";
import AllProductsClient from "./AllProductsClient";
import { ArrowLeft, Link } from "lucide-react";

export default async function ProductsPage() {
  // Always wrap in a try/catch or provide a fallback []
  const products = (await getAdminProducts()) || []; 
  const company = {}; // Fetch your company data here

  return (
    <main className="pt-20 bg-[#2d2520]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <AllProductsClient products={products} company={company} />
      </div>
    </main>
  );
}