import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/nav";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Leslie ❤️💍❤️ Brian",
  description: "For the wedding of Leslie & Brian",
};

export default function RootLayout({ children }) {
  return (
    <>
      <header>
        <Nav />
      </header>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          {children}
        </body>
      </html>
      <Footer />
    </>
  );
}
