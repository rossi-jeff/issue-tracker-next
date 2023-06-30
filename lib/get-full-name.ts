import type { UserType } from '../types/user.type';

export const getFullName = (user: UserType) => {
	let fullName = '';
	if (user.Name) {
		if (user.Name.First) fullName = user.Name.First;
		if (user.Name.Middle) fullName += ` ${user.Name.Middle}`;
		if (user.Name.Last) fullName += ` ${user.Name.Last}`;
	}
	return fullName;
};
