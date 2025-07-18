import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/query-provider";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  fallback: [
    "Inter",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Fira Sans",
    "Droid Sans",
    "Helvetica Neue",
    "sans-serif",
  ],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  fallback: ["monaco", "monospace"],
});

export const metadata: Metadata = {
  title: "Gestia",
  description:
    "Gestia es una plataforma moderna para gestionar trámites y solicitudes de forma eficiente, segura y centralizada. Diseñada para entidades que buscan optimizar sus procesos y mejorar la atención a usuarios.",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          {/* <SocketProvider
            serverUrl={
              process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001"
            }
          > */}
          {children}
          {/* </SocketProvider> */}
          <Toaster richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
