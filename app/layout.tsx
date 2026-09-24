import type { Metadata } from "next";
import "./globals.css";
import "./landing.css";

export const metadata: Metadata = {
  title: "MB Events | Build an Unforgettable Event",
  description: "Explore entertainment, production, and event planning with Michael Bryan Events. Start building your event or check your date.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
