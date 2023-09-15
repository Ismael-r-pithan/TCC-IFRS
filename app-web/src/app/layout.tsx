import { DataProvider } from '@/context/dataContext'
import './globals.css'
import { Roboto_Flex as Roboto } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

export const metadata = {
  title: 'QuizzIFy',
  description: 'TCC',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} bg-gray-600 font-body white`}>
        <DataProvider>
          {children}
        </DataProvider>
        <Toaster
          containerStyle={{
            top: 20,
            left: 20,
            bottom: 20,
            right: 20,
          }}
        />
      </body>
    </html>
  )
}
