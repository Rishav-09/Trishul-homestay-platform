// app/layout.js
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "EcoStay AI – Smart Direct Booking & Himalayan Rural Tourism",
  description: "Experience authentic village life. Direct booking for sustainable, high-altitude eco-homestays in Chopta, Uttarakhand. Guided treks to Tungnath, Chandrashila, and Deoria Tal.",
  keywords: ["homestays", "Chopta", "Tungnath", "Chandrashila", "eco-tourism", "direct booking", "Himalayas", "sustainable travel"],
  authors: [{ name: "EcoStay AI Dev Team" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-sans antialiased flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />
        
        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
