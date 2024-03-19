import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TopProgressbar from '@/components/TopProgressbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Musify',
    description: 'Free music streaming service',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className="">
            <body className={inter.className}>
                <TopProgressbar />
                {children}
            </body>
        </html>
    )
}
