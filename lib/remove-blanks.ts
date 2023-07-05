export const RemoveBlanks = (obj: any, skipObj = false) => {
	const sanitized: any = {}
	for (const key in obj) {
		if (typeof obj[key] === 'object' && obj[key] != null && !skipObj) {
			sanitized[key] = RemoveBlanks(obj[key])
		} else if (
			obj[key] != '' &&
			typeof obj[key] != 'object' &&
			obj[key] != null
		) {
			sanitized[key] = obj[key]
		}
	}
	return sanitized
}
