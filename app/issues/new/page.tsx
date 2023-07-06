import { Metadata } from 'next'
import NewIssueContent from './new-issue-content'

export const metadata: Metadata = {
	title: 'Issue Tracker | New Issue',
}

export default function NewIssuePage() {
	return <NewIssueContent />
}
