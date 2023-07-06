'use client'

import LoadingIndicator from '@/app/loading-indicator'
import { apiUrl } from '@/lib/api-url'
import { buildHeaders } from '@/lib/build-headers'
import { fetcher } from '@/lib/fetcher'
import { getFullName } from '@/lib/get-full-name'
import { RemoveBlanks } from '@/lib/remove-blanks'
import {
	UserSessionType,
	sessionKey,
	useSessionStorage,
} from '@/lib/session.storage'
import { IssueType } from '@/types/issue.type'
import { ProjectType } from '@/types/project.type'
import { TimeClockType } from '@/types/time-clock.type'
import { UserType } from '@/types/user.type'
import { useState } from 'react'
import { FiClock } from 'react-icons/fi'
import useSWR from 'swr'
import { ClockType } from '../../../types/clock.type'

export default function EditTimeClockContent({
	params,
}: {
	params: { uuid: string }
}) {
	const { uuid } = params
	let timeClock: TimeClockType = {
		Start: {
			Date: '',
			Time: '',
		},
		End: {
			Date: '',
			Time: '',
		},
		ProjectId: '',
		IssueId: '',
		UserId: '',
	}
	const { getItem } = useSessionStorage()
	const [session] = useState<UserSessionType>(getItem(sessionKey, 'session'))
	const [modified, setModified] = useState(false)
	const [updates, setUpdates] = useState<TimeClockType>({
		Start: {
			Date: '',
			Time: '',
		},
		End: {
			Date: '',
			Time: '',
		},
		ProjectId: '',
		IssueId: '',
		UserId: '',
	})
	let issues: IssueType[] = []
	let users: UserType[] = []
	let projects: ProjectType[] = []

	const clockReq = useSWR(uuid ? `${apiUrl}/timeclock/${uuid}` : null, fetcher)
	const issueReq = useSWR(`${apiUrl}/issue`, fetcher)
	const userReq = useSWR(`${apiUrl}/user`, fetcher)
	const projectReq = useSWR(`${apiUrl}/project`, fetcher)

	if (
		clockReq.isLoading ||
		userReq.isLoading ||
		issueReq.isLoading ||
		projectReq.isLoading
	)
		return <LoadingIndicator />
	if (clockReq.error || userReq.error || issueReq.error || projectReq.error)
		return <div>Error</div>

	timeClock = clockReq.data
	issues = issueReq.data
	users = userReq.data
	projects = projectReq.data

	const selectChanged = (ev: any) => {
		const { name, value } = ev.target
		setUpdates({
			...updates,
			[name]: value,
		})
		setModified(true)
	}

	const startChanged = (ev: any) => {
		const { name, value } = ev.target
		const { Start } = updates
		const newStart = {
			...Start,
			[name]: value,
		}
		console.log('startChanged', name, value)
		timeClock.Start = newStart
		setUpdates({
			...updates,
			Start: newStart,
		})
		setModified(true)
	}

	const endChanged = (ev: any) => {
		const { name, value } = ev.target
		const { End } = updates
		const newEnd = {
			...End,
			[name]: value,
		}
		console.log('endChanged', name, value)
		console.log(newEnd)
		timeClock.End = newEnd
		setUpdates({
			...updates,
			End: newEnd,
		})
		setModified(true)
	}

	const updateTimeClock = async () => {
		const { UUID } = timeClock
		const { Start, End, ProjectId, UserId, IssueId } = updates
		const payload: TimeClockType = RemoveBlanks({ ProjectId, UserId, IssueId })
		const S: ClockType = RemoveBlanks(Start)
		const E: ClockType = RemoveBlanks(End)
		if (S.Date || S.Time) payload.Start = {}
		if (E.Date || E.Time) payload.End = {}
		if (S.Date) payload.Start.Date = S.Date
		if (S.Time) payload.Start.Time = S.Time
		if (E.Date) payload.End.Date = E.Date
		if (E.Time) payload.End.Time = E.Time

		console.log({ payload })
		const result = await fetch(`${apiUrl}/timeclock/${UUID}`, {
			method: 'PATCH',
			body: JSON.stringify(payload),
			headers: buildHeaders(session),
		})
		if (result.ok) {
			setModified(false)
			setUpdates({
				Start: {
					Date: '',
					Time: '',
				},
				End: {
					Date: '',
					Time: '',
				},
				ProjectId: '',
				IssueId: '',
				UserId: '',
			})
		}
	}
	return (
		<div className="card">
			<div className="flex">
				<span className="mr-1">
					<FiClock size="1.5em" />
				</span>
				<h2>Edit Time Clock</h2>
			</div>
			<div className="flex flex-wrap justify-between mb-4">
				<div>
					<label htmlFor="UserId" className="block">
						User
					</label>
					<select
						name="UserId"
						id="UserId"
						onChange={selectChanged}
						defaultValue={timeClock.UserId}
					>
						<option value="">- select -</option>
						{users.map((u) => (
							<option key={u.UUID} value={u.Id}>
								{getFullName(u)}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="ProjectId" className="block">
						Project
					</label>
					<select
						name="ProjectId"
						id="ProjectId"
						onChange={selectChanged}
						defaultValue={timeClock.ProjectId}
					>
						<option value="">- select -</option>
						{projects.map((p) => (
							<option key={p.UUID} value={p.Id}>
								{p.Sequence ? p.Sequence.Prefix : ''} | {p.Name}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="IssueId" className="block">
						Issue
					</label>
					<select
						name="IssueId"
						id="IssueId"
						onChange={selectChanged}
						defaultValue={timeClock.IssueId}
					>
						<option value="">- select -</option>
						{issues.map((i) => (
							<option key={i.UUID} value={String(i.Id)}>
								{i.SequenceNumber} | {i.Title}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="flex flex-wrap justify-between mb-4">
				<div>
					<label htmlFor="StartDate" className="block">
						Start Date
					</label>
					{timeClock.Start && (
						<input
							type="date"
							name="Date"
							id="StartDate"
							defaultValue={timeClock.Start.Date}
							onChange={startChanged}
						/>
					)}
				</div>
				<div>
					<label htmlFor="StartTime" className="block">
						Start Time
					</label>
					{timeClock.Start && (
						<input
							type="time"
							name="Time"
							id="StartTime"
							defaultValue={timeClock.Start.Time}
							onChange={startChanged}
						/>
					)}
				</div>
				<div>
					<label htmlFor="EndDate" className="block">
						End Date
					</label>
					{timeClock.End && (
						<input
							type="date"
							name="Date"
							id="EndDate"
							defaultValue={timeClock.End.Date}
							onChange={endChanged}
						/>
					)}
				</div>
				<div>
					<label htmlFor="EndTime" className="block">
						End Time
					</label>
					{timeClock.End && (
						<input
							type="time"
							name="Time"
							id="EndTime"
							defaultValue={timeClock.End.Time}
							onChange={endChanged}
						/>
					)}
				</div>
			</div>
			<div>
				{modified && (
					<button onClick={updateTimeClock}>Update Time Clock</button>
				)}
			</div>
		</div>
	)
}
