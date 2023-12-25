import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Lets Task",
  description: "Seu organizador pessoal de tarefas diárias.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex tablet:space-x-5 p-2 tablet:p-10 h-screen">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
