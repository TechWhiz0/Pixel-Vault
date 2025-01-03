import localFont from "next/font/local";
import "./globals.css";
import { Funnel_Display } from "next/font/google";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Pixel Vault",
  description: "Digital Ecommerce Services",
};

const AppFont = Funnel_Display({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={AppFont.className}>
          <Provider>{children}</Provider>
          <Toaster/>
        </body>
      </html>
    </ClerkProvider>
  );
}
