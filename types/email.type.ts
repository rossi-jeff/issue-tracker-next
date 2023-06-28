import type { BaseModelType } from './base-model.type';

export type EmailType = BaseModelType & {
	Address?: string;
	Usage?: string;
	Public?: boolean;
};

export const blankEmail: EmailType = {
	Address: '',
	Usage: 'Personal',
	Public: false
};
