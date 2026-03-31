import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Telegram Stats Wrapped',
  description: 'Privacy-first Telegram Wrapped dashboard built with Next.js.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='it' className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}