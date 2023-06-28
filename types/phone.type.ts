import type { BaseModelType } from './base-model.type';

export type PhoneType = BaseModelType & {
	Number?: string;
	Usage?: string;
	Type?: string;
	Public?: boolean;
};

export const blankPhone: PhoneType = {
	Number: '',
	Usage: 'Personal',
	Type: 'Cellular',
	Public: false
};
