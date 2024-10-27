import type { Metadata } from "next";
import "@/app/globals.css";
import SigninHeader from "@/components/signin-layout/SigninHeader";
import { Poppins } from "next/font/google";
import useAuth from "@/hooks/auth";

// export const metadata: Metadata = {
//   title: "HRIS",
//   description: "Human Resources Information System",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  // const { login } = useAuth({
  //   middleware: 'guest',
  //   redirectIfAuthenticated: '/dashboard'
  // })


  return (
      <div>
        <SigninHeader />
            {children}
      </div>

  );
}
