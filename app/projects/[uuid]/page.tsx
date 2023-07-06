import { Metadata } from 'next'
import EditProjectContent from './edit-project-content'
import { apiUrl } from '../../../lib/api-url'
import { ProjectType } from '../../../types/project.type'

export const metadata: Metadata = {
	title: 'Issue Tracker | Edit Project',
}

export async function generateStaticParams() {
	const result = await fetch(`${apiUrl}/project`)

	if (!result.ok) return []

	const projects: ProjectType[] = await result.json()

	return projects.map((p) => ({ uuid: p.UUID }))
}

export default function EditProjectPage({
	params,
}: {
	params: { uuid: string }
}) {
	return <EditProjectContent params={params} />
}
