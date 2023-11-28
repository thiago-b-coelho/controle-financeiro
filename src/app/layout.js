'use client';
import { Inter, Poppins } from 'next/font/google'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './globals.css'

const inter = Inter({ subsets: ['latin'] });

const theme = createTheme({
  palette: {
    primary: {
      main: '#299D91'
    }
  },
  typography: {
      h1: {
        fontFamily: ['Poppins, sans-serif'].join(', '),
        fontWeight: 500,
        fontSize: '3rem',
        lineHeight: 1.2,
        fontSize: '4rem',
        letterSpacing: 5
      }
  },
})

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ThemeProvider>
  )
}
