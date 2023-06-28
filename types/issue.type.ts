import type { BaseModelType } from './base-model.type';
import type { ProjectType } from './project.type';
import type { UserType } from './user.type';

export type IssueType = BaseModelType & {
	Title?: string;
	Details?: string;
	Type?: string;
	Status?: string;
	Priority?: string;
	Complexity?: string;
	SequenceNumber?: string;
	Author?: UserType;
	AssignedTo?: UserType;
	Project?: ProjectType;
	AuthorId?: string;
	AssignedToId?: string;
	ProjectId?: string;
};
