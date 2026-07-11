import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "TS Care Palace",
  description: "Premium cosmetics and organic skincare products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 2500,
              style: {
                background: "#16301F",
                color: "#fff",
                borderRadius: "12px",
                padding: "16px",
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}