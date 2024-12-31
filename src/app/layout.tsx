import { AuthProvider } from '@/contexts/AuthContext'
import { NewsProvider } from '@/contexts/NewsProvider'
import { ThemeProvider } from '@/contexts/ThemeProvider'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AuthProvider>
            <NewsProvider>
              {children}
            </NewsProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

