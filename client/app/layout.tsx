import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Join the Exclusive Waitlist',
  description: 'Be among the first to experience our product. Join thousands of early adopters already on our exclusive waitlist and get priority access when we launch.',
  keywords: 'waitlist, product launch, early access, startup, innovation, technology',
  authors: [{ name: 'Linconwaves Team' }],
  creator: 'Linconwaves',
  publisher: 'Linconwaves',
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' }
    ]
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://product-waitlist.linconwaves.com',
    siteName: 'Product Waitlist',
    title: 'Join the Exclusive Waitlist',
    description: 'Be among the first to experience our revolutionary product. Join thousands of early adopters already on our exclusive waitlist and get priority access when we launch.',
    images: [{
      url: 'https://product-waitlist.linconwaves.com/api/og',
      width: 1200,
      height: 630,
      alt: 'Product Waitlist'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join the Exclusive Waitlist',
    description: 'Be among the first to experience our revolutionary product. Join thousands of early adopters on our waitlist.',
    images: ['https://product-waitlist.linconwaves.com/api/og'],
    creator: '@linconwaves'
  },
  alternates: {
    canonical: 'https://product-waitlist.linconwaves.com'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}