import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import "./globals.css";

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-exo2",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ArcFit - Apenas você pode arcar com sua jornada.",
  description: "Apenas você pode arcar com sua jornada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${exo2.className} antialiased`}>{children}</body>
    </html>
  );
}
