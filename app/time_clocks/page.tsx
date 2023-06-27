'use client'

import useSWR from 'swr'
import { apiUrl } from '../../lib/api-url'
import { fetcher } from '../../lib/fetcher'

export default function TimeClocksPage() {
	const { data, error, isLoading } = useSWR(`${apiUrl}/timeclock`, fetcher)
	if (isLoading) return <div>Loading...</div>
	if (error) return <div>{error}</div>
	return (
		<div>
			<h1>Time Clocks</h1>
			<div>{JSON.stringify(data)}</div>
		</div>
	)
}
