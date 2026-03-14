import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nomardy",
  description: "Visa-first travel planning for African travelers."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
