import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './Navbar/navbar'
import Footer from './Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'flowmazon',
    description: 'we make your wallet cry',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
            <Navbar/>
            <main className='p-4 max-w-7xl m-auto min-w-[300px]'>
                {children}  
            </main>
            <Footer />
        </body>
        </html>
    )
}
