'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Suspense } from "react";
import Loading from "./loading";
import Navigation from "@/components/layout/Navigation";
import Routes from "@/components/layout/Routes";
import useAuth from "@/hooks/auth";
// import Loading from "./employees/loading";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "HRIS",
//   description: "Human Resources Information System",
// };

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { user } = useAuth({ middleware: 'auth' })

  if (!user) {
    return <Loading />
  }

  return (

    <div className="flex">
        <Routes />
        <div className="h-screen w-full overflow-y-auto">
          <Header />
          <Navigation />
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </div>
    </div>


  );
}