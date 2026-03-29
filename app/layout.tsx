import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sultana.express"),
  title: {
    default: "SultanaExpress — B2B Marketplace for Turkish Manufacturers",
    template: "%s | SultanaExpress",
  },
  description:
    "B2B marketplace connecting international buyers with verified Turkish textile manufacturers. RFQ system, quote comparison, real-time messaging, order tracking.",
  keywords: [
    "B2B marketplace",
    "Turkish manufacturers",
    "textile sourcing",
    "wholesale",
    "RFQ",
    "procurement",
  ],
  openGraph: {
    type: "website",
    siteName: "SultanaExpress",
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
