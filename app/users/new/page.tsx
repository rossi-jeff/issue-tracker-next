'use client'

import { UserType } from '@/types/user.type'
import { useState } from 'react'
import UserForm from '../user-form'
import { PhoneType } from '../../../types/phone.type'
import { EmailType } from '../../../types/email.type'
import { buildHeaders } from '../../../lib/build-headers'
import {
	UserSessionType,
	sessionKey,
	useSessionStorage,
} from '../../../lib/session.storage'
import { apiUrl } from '../../../lib/api-url'

export default function NewUserPage() {
	const { getItem } = useSessionStorage()
	const [session] = useState<UserSessionType>(getItem(sessionKey, 'session'))
	const [user, setUser] = useState<UserType>({
		Credentials: {
			Username: '',
			Password: '',
		},
		Name: {
			First: '',
			Middle: '',
			Last: '',
		},
		Roles: [],
		Phones: [],
		Emails: [],
	})

	const createEmail = (ev: {
		Address: string
		Usage: string
		Public: boolean
	}) => {
		console.log('createEmail', JSON.stringify(ev))
		const Emails: EmailType[] = user.Emails || []
		const { Address, Usage, Public } = ev
		const email: EmailType = { Address, Usage, Public }
		email.UUID = crypto.randomUUID()
		Emails.push(email)
		setUser({
			...user,
			Emails,
		})
	}

	const updateEmail = (ev: {
		Address: string
		Usage: string
		Public: boolean
		UUID: string
	}) => {
		console.log('updateEmail', JSON.stringify(ev))
		const Emails: EmailType[] = user.Emails || []
		const { Address, Usage, Public, UUID } = ev
		const idx = Emails.findIndex((e) => e.UUID == UUID)
		if (idx != -1) {
			const email = Emails[idx]
			const newEmail = { ...email, Address, Usage, Public }
			Emails[idx] = newEmail
		}
		setUser({
			...user,
			Emails,
		})
	}

	const deleteEmail = (UUID: string) => {
		console.log('deleteEmail', UUID)
		const Emails: EmailType[] = user.Emails || []
		const idx = Emails.findIndex((e) => e.UUID == UUID)
		if (idx != -1) Emails.splice(idx, 1)
		setUser({
			...user,
			Emails,
		})
	}

	const createPhone = (ev: {
		Number: string
		Type: string
		Usage: string
		Public: boolean
	}) => {
		console.log('createPhone', JSON.stringify(ev))
		const Phones: PhoneType[] = user.Phones || []
		const { Number, Type, Usage, Public } = ev
		const phone: PhoneType = { Number, Type, Usage, Public }
		phone.UUID = crypto.randomUUID()
		Phones.push(phone)
		setUser({
			...user,
			Phones,
		})
	}

	const updatePhone = (ev: {
		Number: string
		Type: string
		Usage: string
		Public: boolean
		UUID: string
	}) => {
		console.log('updatePhone', JSON.stringify(ev))
		const Phones: PhoneType[] = user.Phones || []
		const { Number, Type, Usage, Public, UUID } = ev
		const idx = Phones.findIndex((p) => p.UUID === UUID)
		if (idx != -1) {
			const phone = Phones[idx]
			const newPhone: PhoneType = { ...phone, Number, Type, Usage, Public }
			Phones[idx] = newPhone
		}
		setUser({
			...user,
			Phones,
		})
	}

	const deletePhone = (UUID: string) => {
		console.log('deletePhone', UUID)
		const Phones: PhoneType[] = user.Phones || []
		const idx = Phones.findIndex((p) => p.UUID === UUID)
		if (idx != -1) Phones.splice(idx, 1)
		setUser({
			...user,
			Phones,
		})
	}

	const updateUserAttr = (updates: UserType) => {
		console.log('updateUserAttr', JSON.stringify(updates))
		const { Name, Credentials, Roles } = updates
		setUser({
			...user,
			Name,
			Credentials,
			Roles,
		})
	}

	const registerUser = async () => {
		const { Name, Credentials, Roles, Phones, Emails } = user
		if (!Name || !Credentials) return
		if (
			!(Name.First || Name.Last || Credentials.Username || Credentials.Password)
		)
			return
		const result = await fetch(`${apiUrl}/register`, {
			method: 'POST',
			body: JSON.stringify({ Name, Credentials, Roles, Phones, Emails }),
			headers: buildHeaders(session),
		})
		if (result.ok) {
			setUser({
				Credentials: {
					Username: '',
					Password: '',
				},
				Name: {
					First: '',
					Middle: '',
					Last: '',
				},
				Roles: [],
				Phones: [],
				Emails: [],
			})
		}
	}
	return (
		<div className="card">
			<h2>New User</h2>
			<UserForm
				user={user}
				showPass={true}
				createEmail={createEmail}
				updateEmail={updateEmail}
				deleteEmail={deleteEmail}
				createPhone={createPhone}
				updatePhone={updatePhone}
				deletePhone={deletePhone}
				updateUserAttr={updateUserAttr}
			/>
			<button onClick={registerUser}>Register User</button>
		</div>
	)
}
