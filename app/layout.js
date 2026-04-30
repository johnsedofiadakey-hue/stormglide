import './globals.css'

export const metadata = {
  title: 'STORMGLIDE — Enterprise Logistics & Supply Portal',
  description: 'B2B supply catalog and logistics solutions for West Africa. LCL, FCL, air freight, industrial chemicals, heavy machinery and vehicles sourced from China.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
