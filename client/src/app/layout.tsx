import type { Metadata } from "next";
import { Inter, Rock_3D } from "next/font/google";
import "./globals.css";

//const inter = Inter({ subsets: ["latin"] });
const rock3D = Rock_3D({ subsets: ["latin"], weight: ["400"], variable: '--font-rock3d' });

export const metadata: Metadata = {
  title: "Thought Square",
  description: "Share your thoughts with the world. The open graffiti wall of the internet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rock3D.variable}>{children}</body>
    </html>
  );
}
