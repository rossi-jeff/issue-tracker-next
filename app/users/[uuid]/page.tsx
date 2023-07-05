'use client'

import { apiUrl } from '@/lib/api-url'
import { fetcher } from '@/lib/fetcher'
import { UserType } from '@/types/user.type'
import { useParams } from 'next/navigation'
import useSWR from 'swr'
import UserForm from '../user-form'
import {
	UserSessionType,
	sessionKey,
	useSessionStorage,
} from '../../../lib/session.storage'
import { useState } from 'react'
import { buildHeaders } from '../../../lib/build-headers'
import { EmailType } from '../../../types/email.type'
import { PhoneType } from '../../../types/phone.type'
import { FiUser } from 'react-icons/fi'

export default function EditUserPage() {
	const { uuid } = useParams()
	const { getItem } = useSessionStorage()
	const [session] = useState<UserSessionType>(getItem(sessionKey, 'session'))
	const [modified, setModified] = useState(false)
	let user: UserType = {
		Credentials: {
			Username: '',
		},
		Name: {
			First: '',
			Middle: '',
			Last: '',
		},
		Roles: [],
		Phones: [],
		Emails: [],
	}
	const userReq = useSWR(uuid ? `${apiUrl}/user/${uuid}` : null, fetcher)
	if (userReq.isLoading) return <div>Loading...</div>
	if (userReq.error) return <div>Error</div>

	user = userReq.data

	const createEmail = async (ev: {
		Address: string
		Usage: string
		Public: boolean
	}) => {
		console.log(ev)
		const { Address, Usage, Public } = ev
		const { UUID } = user
		const result = await fetch(`${apiUrl}/user/${UUID}/email`, {
			method: 'POST',
			body: JSON.stringify({ Address, Usage, Public }),
			headers: buildHeaders(session),
		})
		if (result.ok) {
			const email: EmailType = await result.json()
			if (!user.Emails) user.Emails = []
			user.Emails.push(email)
			userReq.mutate(user)
		}
	}

	const updateEmail = async (ev: {
		Address: string
		Usage: string
		Public: boolean
		UUID: string
	}) => {
		console.log(ev)
		const { Address, Usage, Public, UUID } = ev
		const result = await fetch(`${apiUrl}/email/${UUID}`, {
			method: 'PATCH',
			body: JSON.stringify({ Address, Usage, Public }),
			headers: buildHeaders(session),
		})
		if (result.ok) {
			if (!user.Emails) user.Emails = []
			const email = await result.json()
			const idx = user.Emails.findIndex((e) => e.UUID == UUID)
			if (idx != -1) {
				user.Emails[idx] = email
				userReq.mutate(user)
			}
		}
	}

	const deleteEmail = async (UUID: string) => {
		console.log(UUID)
		const result = await fetch(`${apiUrl}/email/${UUID}`, {
			method: 'DELETE',
			headers: buildHeaders(session),
		})
		if (result.ok) {
			if (!user.Emails) user.Emails = []
			const idx = user.Emails.findIndex((e) => e.UUID == UUID)
			if (idx != -1) user.Emails.splice(idx, 1)
			userReq.mutate(user)
		}
	}

	const createPhone = async (ev: {
		Number: string
		Type: string
		Usage: string
		Public: boolean
	}) => {
		console.log(ev)
		const { Number, Type, Usage, Public } = ev
		const { UUID } = user
		const result = await fetch(`${apiUrl}/user/${UUID}/phone`, {
			method: 'POST',
			body: JSON.stringify({ Number, Type, Usage, Public }),
			headers: buildHeaders(session),
		})
		if (result.ok) {
			const phone: PhoneType = await result.json()
			if (!user.Phones) user.Phones = []
			user.Phones.push(phone)
			userReq.mutate(user)
		}
	}

	const updatePhone = async (ev: {
		Number: string
		Type: string
		Usage: string
		Public: boolean
		UUID: string
	}) => {
		console.log(ev)
		const { Number, Type, Usage, Public, UUID } = ev
		const result = await fetch(`${apiUrl}/phone/${UUID}`, {
			method: 'PATCH',
			body: JSON.stringify({ Number, Type, Usage, Public }),
			headers: buildHeaders(session),
		})
		if (result.ok) {
			const phone = await result.json()
			if (!user.Phones) user.Phones = []
			const idx = user.Phones.findIndex((p) => p.UUID == UUID)
			if (idx != -1) user.Phones[idx] = phone
			userReq.mutate(user)
		}
	}

	const deletePhone = async (UUID: string) => {
		console.log(UUID)
		const result = await fetch(`${apiUrl}/phone/${UUID}`, {
			method: 'DELETE',
			headers: buildHeaders(session),
		})
		if (result.ok) {
			if (!user.Phones) user.Phones = []
			const idx = user.Phones.findIndex((p) => p.UUID == UUID)
			if (idx != -1) user.Phones.splice(idx, 1)
			userReq.mutate(user)
		}
	}

	const updateUserAttr = (updates: UserType) => {
		console.log(updates)
		const { Name, Credentials, Roles } = updates
		user.Name = Name
		user.Credentials = Credentials
		user.Roles = Roles
		userReq.mutate(user)
		setModified(true)
	}

	const updateUser = async () => {
		const { Name, Credentials, Roles, UUID } = user
		const result = await fetch(`${apiUrl}/user/${UUID}`, {
			method: 'PATCH',
			body: JSON.stringify({ Name, Credentials, Roles }),
			headers: buildHeaders(session),
		})
		if (result.ok) {
			const updated = await result.json()
			userReq.mutate(updated)
			setModified(false)
		}
	}
	return (
		<div className="card">
			<div className="flex">
				<span className="mr-2 mt-1">
					<FiUser size="1.2em" />
				</span>
				<h2>Edit User</h2>
			</div>
			<UserForm
				user={user}
				showPass={false}
				createEmail={createEmail}
				updateEmail={updateEmail}
				deleteEmail={deleteEmail}
				createPhone={createPhone}
				updatePhone={updatePhone}
				deletePhone={deletePhone}
				updateUserAttr={updateUserAttr}
			/>
			{modified && <button onClick={updateUser}>Update User</button>}
		</div>
	)
}
