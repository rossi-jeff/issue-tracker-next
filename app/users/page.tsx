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
import Link from 'next/link'
import { FiPlusCircle, FiUsers } from 'react-icons/fi'

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
			<div className="flex flex-wrap">
				<span className="mt-1 mr-1">
					<FiUsers size="1.5em" />
				</span>
				<h1>Users</h1>
				{session.signedIn && (
					<Link href="/users/new" className="ml-4 mt-1 flex">
						New User
						<span className="ml-1 mt-1">
							<FiPlusCircle />
						</span>
					</Link>
				)}
			</div>
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
