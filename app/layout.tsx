import type { Metadata } from "next";
import { Instrument_Serif, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "./case.css";
import "./overrides.css";
import "./motion.css";

const sans = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Thanushree Suresh | Digital Workshop",
  description: "The personal portfolio of Thanushree Suresh, CS Engineering Student (3rd year) | Flutter & AI Developer."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}
