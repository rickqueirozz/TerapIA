import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import FooterNotice from "@/components/FooterNotice";
import { I18nProvider } from "@/lib/i18n";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400","600","700"],
});

export const metadata: Metadata = {
  title: "TerapIA",
  description: "Terapeuta IA com triagem e chat - Next.js + Express + Gemini",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} antialiased min-h-screen flex flex-col`} style={{ fontFamily: 'var(--font-nunito), var(--font-geist-sans), system-ui, -apple-system' }}>
        <I18nProvider>
          <header className="sticky top-0 z-10" style={{ backdropFilter: 'blur(8px)', background: 'var(--background)', borderBottom: '1px solid var(--border-color)' }}>
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
              <Link href="/" className="font-semibold">TerapIA</Link>
              <nav className="flex items-center gap-3 text-sm">
                <Link href="/triagem" className="hover:underline">Triagem</Link>
                <Link href="/chat" className="hover:underline">Chat</Link>
                <LanguageSwitcher />
                <ThemeToggle />
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t mt-8" style={{ borderColor: 'var(--border-color)' }}>
            <div className="max-w-5xl mx-auto">
              <FooterNotice />
            </div>
          </footer>
        </I18nProvider>
      </body>
    </html>
  );
}
