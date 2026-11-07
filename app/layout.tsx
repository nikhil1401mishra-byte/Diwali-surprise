import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://diwali-surprise.vercel.app"),
  title: "A Little Diwali Surprise ✨ | From Nikhil",
  description:
    "A premium personalized interactive Diwali digital gift experience with glowing diyas, decorations, festive sweets, sky fireworks, and a heartfelt letter from Nikhil.",
  keywords: [
    "Diwali",
    "Diwali Greeting",
    "Personalized Gift",
    "Digital Diwali",
    "Happy Diwali",
    "Nikhil",
  ],
  authors: [{ name: "Nikhil" }],
  openGraph: {
    title: "A Little Diwali Surprise ✨ | From Nikhil",
    description:
      "A premium personalized interactive Diwali digital gift experience created with love.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/screen1_gift_arch.png",
        width: 1200,
        height: 675,
        alt: "A Little Diwali Surprise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "A Little Diwali Surprise ✨ | From Nikhil",
    description: "A premium personalized interactive Diwali digital gift experience.",
    images: ["/images/screen1_gift_arch.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#070B19",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-diwali-dark text-diwali-cream antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
