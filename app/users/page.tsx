'use client'

import useSWR from 'swr'
import { apiUrl } from '../../lib/api-url'
import { fetcher } from '../../lib/fetcher'

export default function UsersPage() {
	const { data, error, isLoading } = useSWR(`${apiUrl}/user`, fetcher)
	if (isLoading) return <div>Loading...</div>
	if (error) return <div>{error}</div>
	return (
		<div>
			<h1>Users</h1>
			<div>{JSON.stringify(data)}</div>
		</div>
	)
}
