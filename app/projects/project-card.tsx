'use client'

import {
	UserSessionType,
	sessionKey,
	useSessionStorage,
} from '@/lib/session.storage'
import { ProjectType } from '@/types/project.type'
import Link from 'next/link'
import { useState } from 'react'
import { FiEdit } from 'react-icons/fi'

export default function ProjectCard({ project }: { project: ProjectType }) {
	const { getItem } = useSessionStorage()
	const [session] = useState<UserSessionType>(getItem(sessionKey, 'session'))
	return (
		<div className="card" id={'project-' + project.UUID}>
			<div className="flex flex-wrap">
				{session.signedIn && (
					<Link href={'/projects/' + project.UUID} className="mr-2 mt-1">
						<FiEdit />
					</Link>
				)}
				<h2>{project.Name}</h2>
			</div>
			<div>{project.Details}</div>
		</div>
	)
}
