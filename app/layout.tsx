import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-outfit',
});

export const metadata: Metadata = {
    title: 'Tasker - Premium Task Management',
    description: 'A modern, drag-and-drop task manager.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${outfit.variable} antialiased min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30 selection:text-blue-200`}>
                {children}
            </body>
        </html>
    );
}
