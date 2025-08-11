"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import ContentGrid from "@/components/home/ContentGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,_#E5F5D6_0%,_#F5F5F5_25%,_#F5F5F5_100%)]">
      <Header />
      <main role="main">
        <Hero />
        <ContentGrid />
      </main>
      <Footer />
    </div>
  );
}
