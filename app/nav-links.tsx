import Link from 'next/link'

type LinkType = { path: string; text: string }

export default function NavLinks() {
	const links: LinkType[] = [
		{ path: '/dashboard', text: 'Dashboard' },
		{ path: '/projects', text: 'Projects' },
		{ path: '/issues', text: 'Issues' },
		{ path: '/users', text: 'Users' },
		{ path: '/time_clocks', text: 'Time Clocks' },
	]
	return (
		<div className="flex flex-wrap justify-between mx-4">
			<Link href="/">Home</Link>
			{links.map((link, index) => (
				<Link href={link.path} key={index}>
					{link.text}
				</Link>
			))}
		</div>
	)
}
