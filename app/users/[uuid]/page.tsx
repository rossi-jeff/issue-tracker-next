import { Metadata } from 'next'
import EditUserContent from './edit-user-content'
import { apiUrl } from '../../../lib/api-url'
import { UserType } from '../../../types/user.type'

export const metadata: Metadata = {
	title: 'Issue Tracker | Edit User',
}

export async function generateStaticParams() {
	const result = await fetch(`${apiUrl}/user`)

	if (!result.ok) return []

	const users: UserType[] = await result.json()

	return users.map((u) => ({ uuid: u.UUID }))
}

export default function EditUserPage({ params }: { params: { uuid: string } }) {
	return <EditUserContent params={params} />
}
