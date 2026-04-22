import { Syne, Inter } from 'next/font/google';
import './globals.css';

const heading = Syne({ 
  subsets: ['latin'], 
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800'] 
});
const body = Inter({ 
  subsets: ['latin'], 
  variable: '--font-body' 
});

export const metadata = {
  title: 'Home of Effects | Props & Decor Studio',
  description: 'Editorial set design and unique rentals for brand visionaries.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}