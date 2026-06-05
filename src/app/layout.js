import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata = {
  title: "EVRE Charging Hub | Premium EV Charging & Lounge Network",
  description: "Experience ultra-fast 350kW DC charging powered by 100% green energy. Relax and recharge in our premium lounges with co-working spaces, high-speed Wi-Fi, and gourmet coffee.",
  keywords: ["EV charging", "electric vehicle charging station", "DC fast charger", "EV lounge", "green energy charging", "fleet EV charging"],
  openGraph: {
    title: "EVRE Charging Hub | Premium EV Charging Network",
    description: "Charge your car. Recharge yourself. 350kW DC charging with premium lounges.",
    type: "website",
    locale: "en_US",
  }
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0B0F19] text-slate-100 font-sans">{children}</body>
    </html>
  );
}
