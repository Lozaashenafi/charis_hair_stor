import Footer from "@/components/site/Footer";
import Header from "@/components/site/Header";
import React from "react";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
         <main className="min-h-screen">
        <Header/>
        {children}
        <Footer/> 
      </main>
    </div>
  );
}