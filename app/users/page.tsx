'use client'

import useSWR from 'swr'
import { apiUrl } from '../../lib/api-url'
import { fetcher } from '../../lib/fetcher'
import { UserType } from '@/types/user.type'
import UserCard from './user-card'
import { useState } from 'react'
import PaginationControls from '../pagination-controls'
import {
	UserSessionType,
	sessionKey,
	useSessionStorage,
} from '../../lib/session.storage'

export default function UsersPage() {
	const { getItem } = useSessionStorage()
	const [session] = useState<UserSessionType>(getItem(sessionKey, 'session'))
	const [limit, setLimit] = useState(10)
	const [offset, setOffset] = useState(0)

	let users: UserType[] = []

	const { data, error, isLoading } = useSWR(`${apiUrl}/user`, fetcher)
	if (isLoading) return <div>Loading...</div>
	if (error) return <div>{error}</div>

	users = data

	const pageChanged = (newPage: number) => {
		setOffset((newPage - 1) * limit)
	}

	const limitChanged = (newLimit: number) => {
		setLimit(newLimit)
		setOffset(0)
	}
	return (
		<div>
			<h1>Users</h1>
			{users.slice(offset, offset + limit).map((user) => (
				<UserCard key={user.Id} user={user} />
			))}
			<PaginationControls
				offset={offset}
				limit={limit}
				count={users.length}
				pageChanged={pageChanged}
				limitChanged={limitChanged}
			/>
		</div>
	)
}
