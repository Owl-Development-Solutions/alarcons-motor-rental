import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { getCurrentUser } from "@/data/actions/user";
import { UserProvider } from "@/data/context/user-context";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JE Cebu Tours",
  description:
    "Premium motor rental services for all your transportation needs",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user = null;

  try {
    const res = await getCurrentUser();
    user = res?.user;
  } catch {
    // not logged in / invalid token — user stays null
  }

  return (
    <html
      lang="en"
      className={`${inter.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <UserProvider initialUser={user}>
          <NextTopLoader color="orange" />
          {children}
        </UserProvider>
        <Toaster />
      </body>
    </html>
  );
}
