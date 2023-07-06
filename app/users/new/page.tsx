import { Metadata } from 'next'
import NewUserContent from './new-user-content'

export const metadata: Metadata = {
	title: 'Issue Tracker | New User',
}

export default function NewUserPage() {
	return <NewUserContent />
}
