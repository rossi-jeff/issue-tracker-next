import Link from 'next/link'
import {
	FiHome,
	FiGrid,
	FiTool,
	FiList,
	FiUsers,
	FiClock,
} from 'react-icons/fi'

type LinkType = { path: string; text: string; icon: any }

export default function NavLinks() {
	const links: LinkType[] = [
		{ path: '/dashboard', text: 'Dashboard', icon: <FiGrid /> },
		{ path: '/projects', text: 'Projects', icon: <FiTool /> },
		{ path: '/issues', text: 'Issues', icon: <FiList /> },
		{ path: '/users', text: 'Users', icon: <FiUsers /> },
		{ path: '/time_clocks', text: 'Time Clocks', icon: <FiClock /> },
	]
	return (
		<div className="flex flex-wrap justify-between">
			<Link href="/" className="flex">
				<span className="mr-1 mt-1">
					<FiHome />
				</span>
				Home
			</Link>
			{links.map((link, index) => (
				<Link href={link.path} key={index} className="flex">
					<span className="mr-1 mt-1">{link.icon}</span>
					{link.text}
				</Link>
			))}
		</div>
	)
}
