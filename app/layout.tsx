import './globals.css'
import { Inter } from 'next/font/google'
import NavLinks from './nav-links'
import AuthButtons from './auth-buttons'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthButtons />
				<NavLinks />
				<div className="p-4">{children}</div>
			</body>
		</html>
	)
}
