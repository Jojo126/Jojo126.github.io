import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Menu from "./Menu/Menu";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Johanna Palmkvist | Portfolio",
  description: "Frontend developer at day. Gaming, drawing and 3D modeling enthusiast at night.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="App">
          <span id="noiseBg"></span>
          <Menu />
          <div className='vertLine'></div>
          {children}
        </main>
      </body>
    </html>
  );
}