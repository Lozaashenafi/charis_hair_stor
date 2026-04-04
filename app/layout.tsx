import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../src/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

/* --- DYNAMIC METADATA WITH IMAGE --- */
export const metadata: Metadata = {
  title: "Charis Store | Premium Human Hair Masterpieces",
  description: "Discover ethically sourced, high-quality human hair, bundles, and wigs. Worldwide shipping from Canada and USA.",
  metadataBase: new URL('https://charishairstor.vercel.app/'), // Replace with your actual domain later
  openGraph: {
    title: "Charis Store | Luxury Human Hair",
    description: "Explore our curated collection of premium human hair masterpieces.",
    url: "/",
    siteName: "Charis Store Canada",
    images: [
      {
        url: "/banner.jpg", // The image from your public folder
        width: 1200,
        height: 630,
        alt: "Charis Store Luxury Hair Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Charis Store | Luxury Human Hair",
    description: "Premium hair masterpieces delivered worldwide.",
    images: ["/banner1.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png", // Uses your logo for apple home screen bookmarking
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body 
        className={`${playfair.variable} ${inter.variable} ${geistSans.variable} ${geistMono.variable} font-sans bg-[#2d2520] text-[#f5f1ed] antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}