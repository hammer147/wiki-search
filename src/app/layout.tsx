import Navbar from './components/navbar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

export const metadata = {
  title: 'Wiki Search App',
  description: 'An app that searches Wikipedia'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${inter.variable}`}>
      <body className='p-2 font-inter'>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
