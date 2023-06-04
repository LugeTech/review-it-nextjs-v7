import "./globals.css";
import { Poppins } from "next/font/google";
import Navbar from "./components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import "@smastrom/react-rating/style.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: "normal",
});

export const metadata = {
  title: "Review It",
  description:
    "Review It is a website where you can share and read reviews on anything. It is easy, fun, and free to use.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          <Navbar>{children}</Navbar>
        </body>
      </html>
    </ClerkProvider>
  );
}
