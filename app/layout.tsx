'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import { paletteNames } from '../lib/palette'
import TopBar from './top-bar'
import BottomBar from './bottom-bar'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const [palette, setPalette] = useState<string>(paletteNames[0])

	const changePalette = (name: string) => setPalette(name)
	return (
		<html lang="en">
			<body className={inter.className} data-theme={palette}>
				<div className="m-0 p-0 flex flex-col h-screen">
					<TopBar />
					<div className="p-4 flex-grow overflow-y-auto">{children}</div>
					<BottomBar changePalette={changePalette} />
				</div>
			</body>
		</html>
	)
}
