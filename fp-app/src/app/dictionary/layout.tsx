import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function DictionaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,_#E5F5D6_0%,_#F5F5F5_25%,_#F5F5F5_100%)]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
