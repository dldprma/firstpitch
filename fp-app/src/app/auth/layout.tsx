import Header from "@/components/layout/Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_center,_#E5F5D6_0%,_#E5F5D6_30%,_#F5F5F5_50%,_#F5F5F5_100%)]">
      <Header />
      <div className="flex items-center justify-center px-4 py-8 min-h-screen">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
