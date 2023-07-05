export type StorageType = 'local' | 'session'

export const sessionKey = 'issue-tracker-next'

export type UserSessionType = {
	UUID: string | null
	Name: string | null
	Token: string | null
	UserName: string | null
	SessionId: string | null
	signedIn: boolean
}

export const blankUserSession: UserSessionType = {
	UUID: null,
	Name: null,
	Token: null,
	UserName: null,
	SessionId: null,
	signedIn: false,
}

type StorageReturnValue = {
	getItem: (key: string, type?: StorageType) => UserSessionType
	setItem: (key: string, value: UserSessionType, type?: StorageType) => boolean
	removeItem: (key: string, type?: StorageType) => void
}

export const useSessionStorage = (): StorageReturnValue => {
	const storageType = (
		type?: StorageType
	): 'localStorage' | 'sessionStorage' => {
		return `${type || 'session'}Storage`
	}

	const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')()

	const getItem = (key: string, type?: StorageType) => {
		const strData = isBrowser
			? window[storageType(type)][key]
			: JSON.stringify(blankUserSession)
		const data: UserSessionType = strData
			? JSON.parse(strData)
			: blankUserSession
		return data
	}

	const setItem = (key: string, value: UserSessionType, type?: StorageType) => {
		if (isBrowser) {
			window[storageType(type)][key] = JSON.stringify(value)
			return true
		}
		return false
	}

	const removeItem = (key: string, type?: StorageType) => {
		window[storageType(type)].removeItem(key)
	}

	return { getItem, setItem, removeItem }
}
