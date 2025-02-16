import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "simplywear",
  description: "minimalist fashion store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
