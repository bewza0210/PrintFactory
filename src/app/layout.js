import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import SessionProvider from '../components/SessionProvider.jsx'
import './globals.css'
import Sidebar from '../components/side-bar'
import { headers } from 'next/headers' // ✅ ถ้าอยู่ใน app/

export const metadata = {
  title: 'Printing factory',
  description: 'Create for make portfolio',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)

  console.log("SESSION FROM LAYOUT:", session)

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <div className="flex min-h-screen">
            {session && <Sidebar />}
            <main style={{ flex: 1, padding: 20 }}>
              {children}
            </main>
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
