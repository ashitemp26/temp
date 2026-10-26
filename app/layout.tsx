import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shashitha & Ashani — A Fairytale Begins",
  description: "A personal invitation to celebrate the wedding of Shashitha and Ashani on 4 December 2026 at Saffron, Wadduwa.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
