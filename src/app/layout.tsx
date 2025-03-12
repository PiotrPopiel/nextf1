import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { lato } from "./ui/fonts";

export const metadata: Metadata = {
  title: "F1next",
  description: "F1next - Your next pit stop to gather the info about Formula 1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={`${lato.className} antialiased`}>
        <div className="bg-slate-950 text-gray-50">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
