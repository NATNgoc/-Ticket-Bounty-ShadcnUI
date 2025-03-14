import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SideBar } from "@/app/_navigation/sidebar/components/side-bar";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ToastCookie } from "@/components/toast-cookie";
import { Toaster } from "@/components/ui/toast";
import { AuthProvider } from "@/context/auth-context";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "App của Ngọc",
  description: "Ngọc tự làm á nhen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            <Header></Header>
            <div className="grid grid-cols-[auto,1fr] grid-rows-1 content-center">
              <SideBar></SideBar>
              <main
                className="min-h-screen
            overflow-y-auto overflow-x-hidden
            py-24 px-8
            bg-secondary/20
            flex flex-col"
              >
                <NuqsAdapter>{children}</NuqsAdapter>
              </main>
            </div>
            <Toaster richColors />
            <ToastCookie></ToastCookie>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
