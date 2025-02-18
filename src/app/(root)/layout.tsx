import type { Metadata } from "next";
import {  Poppins } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { ClerkProvider } from "@clerk/nextjs";


const poppins = Poppins({
  weight: "400",
  variable: "--font-poppins",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
          <ClerkProvider>
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <Navbar />
        <section className="flex justify-center items-center w-full min-h-screen">

        {children}
        </section>
      </body>
            </html>
        </ClerkProvider>
  );
}
