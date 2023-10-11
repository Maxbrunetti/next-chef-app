import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './GlobalRedux/provider';
const inter = Inter({ subsets: ['latin'] });
import Navbar from '../components/navigation';
export const metadata: Metadata = {
  title: 'The Chef App',
  description: 'Best app to manage stock in kitchens',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
