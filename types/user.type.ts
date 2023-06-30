import type { BaseModelType } from './base-model.type';
import type { CredentialsType } from './credentials.type';
import type { EmailType } from './email.type';
import type { NameType } from './name.type';
import type { PhoneType } from './phone.type';

export type RoleType = 'Developer' | 'Support' | 'Manager' | 'Sales' | 'EndUser';

export type UserType = BaseModelType & {
	Credentials?: CredentialsType;
	Name?: NameType;
	Emails?: EmailType[];
	Phones?: PhoneType[];
	Roles?: RoleType[];
};

export const blankUser: UserType = {
	Credentials: {},
	Name: {},
	Emails: [],
	Phones: [],
	Roles: []
};
