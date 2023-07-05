import { UserSessionType } from './session.storage'

export const buildHeaders = (session: UserSessionType) => {
	const headers: { [key: string]: string } = {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	}
	if (session.Token) {
		headers['Authorization'] = `Bearer ${session.Token}`
	}
	return headers
}
