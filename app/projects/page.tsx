'use client'

import useSWR from 'swr'
import { fetcher } from '../../lib/fetcher'
import { apiUrl } from '../../lib/api-url'

export default function ProjectsPage() {
	const { data, error, isLoading } = useSWR(`${apiUrl}/project`, fetcher)
	if (isLoading) return <div>Loading...</div>
	if (error) return <div>{error}</div>

	return (
		<div>
			<h1>Projects</h1>
			<div>{JSON.stringify(data)}</div>
		</div>
	)
}
