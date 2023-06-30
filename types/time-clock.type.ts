import type { BaseModelType } from './base-model.type';
import type { ClockType } from './clock.type';
import type { IssueType } from './issue.type';
import type { ProjectType } from './project.type';
import type { UserType } from './user.type';

export type TimeClockType = BaseModelType & {
	Start: ClockType;
	End: ClockType;
	User?: UserType;
	Project?: ProjectType;
	Issue?: IssueType;
	ProjectId?: string;
	IssueId?: string;
	UserId?: string;
};
