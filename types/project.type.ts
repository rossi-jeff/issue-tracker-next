import type { BaseModelType } from './base-model.type';
import type { SequenceType } from './sequence.type';

export type ProjectType = BaseModelType & {
	Name?: string;
	Details?: string;
	Sequence?: SequenceType;
};
