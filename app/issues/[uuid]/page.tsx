import { Metadata } from 'next'
import EditIssueContent from './edit-issue-content'
import { IssueType } from '../../../types/issue.type'
import { apiUrl } from '../../../lib/api-url'

export const metadata: Metadata = {
	title: 'Issue Tracker | Edit Issue',
}

export async function generateStaticParams() {
	const result = await fetch(`${apiUrl}/issue`)

	if (!result.ok) return []

	const issues: IssueType[] = await result.json()

	return issues.map((i) => ({ uuid: i.UUID }))
}

export default function EditIssuePage({
	params,
}: {
	params: { uuid: string }
}) {
	return <EditIssueContent params={params} />
}
