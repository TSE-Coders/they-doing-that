import localFont from "next/font/local";
import "./globals.css";
import DatadogInit from "./components/datadog-init";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "TDT supersandbox",
  description: "With love from TSE3",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
    
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DatadogInit/>
        {children}
      </body>
    </html>
  );
}
