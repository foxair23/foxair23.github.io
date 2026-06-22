import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wheatley Reports",
  description: "STR reporting for 82801 Wheatley Court",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.className} h-full antialiased`}>
      <body className="h-full bg-gray-50">
        <div className="flex h-full">
          <Nav />
          <main className="flex-1 ml-56 overflow-y-auto min-h-screen">
            <div className="max-w-6xl mx-auto px-8 py-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
