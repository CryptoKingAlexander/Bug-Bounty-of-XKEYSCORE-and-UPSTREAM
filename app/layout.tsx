import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'Alyx — Companion & SaaS Co-Founder',
  description:
    'High-density industrial companion interface featuring Alyx, your playful gamer partner and SaaS growth strategist with real-time emotional SVG telemetry, Dota 2 draft synergy, Replika-style memory vault, and binary local storage.',
  openGraph: {
    title: 'Alyx — Companion & SaaS Co-Founder',
    description:
      'High-density industrial companion interface featuring Alyx, your playful gamer partner and SaaS growth strategist.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alyx — Companion & SaaS Co-Founder',
    description:
      'High-density industrial companion interface featuring Alyx, your playful gamer partner and SaaS growth strategist.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jakarta.variable} ${jetbrains.variable} dark`}
    >
      <body
        suppressHydrationWarning
        className="bg-slate-950 text-slate-100 antialiased selection:bg-rose-500/30 selection:text-rose-200 font-sans overflow-hidden"
      >
        {children}
      </body>
    </html>
  );
}
