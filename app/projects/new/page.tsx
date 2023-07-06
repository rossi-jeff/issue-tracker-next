import { Metadata } from 'next'
import NewProjectContent from './new-project-content'

export const metadata: Metadata = {
	title: 'Issue Tracker | New Project',
}

export default function NewProjectPage() {
	return <NewProjectContent />
}
