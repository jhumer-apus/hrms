import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { CookiesProvider } from "next-client-cookies/server";
import { ConfigProvider } from "antd";
import 'antd/dist/reset.css';
import useAuth from "@/hooks/auth"; // Ensure this path is correct

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400']
});

export const metadata: Metadata = {
  title: "HRMS",
  description: "Human Resources Information System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Poppins"
        }
      }}
    >
      <CookiesProvider>
        <html lang="en">
          <head>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap"
            />
          </head>
          <body className={poppins.className}>
            <AntdRegistry>
              {children}
            </AntdRegistry>
            {/* Uncomment if needed */}
            {/* <Footer /> */}
          </body>
        </html>
      </CookiesProvider>
    </ConfigProvider>
  );
}
