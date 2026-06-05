import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({ children }) {
  return (
    <div className="flex-1 flex flex-col font-sans bg-[#0B0F19] text-slate-100 min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
