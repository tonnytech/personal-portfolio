import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import Providers from "./components/Providers";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tonny Tei",
  description: "Portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning>
      <body className='min-h-full flex flex-col transition-colors'>
        <Providers>
          <div className='container mx-auto dark:bg-gray-900 mb-0'>
            <div className='lg:mx-32 lg:pt-12 flex-1 flex flex-col'>
              <Navbar />
              <div className='flex-1'>{children}</div>

              <Footer />
            </div>
          </div>
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}
