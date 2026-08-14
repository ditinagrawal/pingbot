import type { Metadata } from "next";
import { Rubik } from "next/font/google";

import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/server/client";

import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Pingbot",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <TRPCReactProvider>
      <html lang="en" className={cn("h-full", "antialiased", rubik.className)}>
        <body className="flex min-h-full flex-col">{children}</body>
      </html>
    </TRPCReactProvider>
  );
}
