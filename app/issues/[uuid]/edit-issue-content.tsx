'use client'

import { apiUrl } from '@/lib/api-url'
import { fetcher } from '@/lib/fetcher'
import { getFullName } from '@/lib/get-full-name'
import {
	ComplexityArray,
	IssueTypeArray,
	PriorityArray,
	StatusArray,
} from '@/types/array.types'
import { IssueType } from '@/types/issue.type'
import { ProjectType } from '@/types/project.type'
import { UserType } from '@/types/user.type'
import { useState } from 'react'
import useSWR from 'swr'
import { RemoveBlanks } from '../../../lib/remove-blanks'
import { buildHeaders } from '../../../lib/build-headers'
import {
	UserSessionType,
	sessionKey,
	useSessionStorage,
} from '../../../lib/session.storage'
import LoadingIndicator from '@/app/loading-indicator'
import { FiList } from 'react-icons/fi'

export default function EditIssueContent({
	params,
}: {
	params: { uuid: string }
}) {
	let issue: IssueType = {
		SequenceNumber: '',
		ProjectId: '',
		Title: '',
		Details: '',
		Priority: '',
		Status: '',
		Complexity: '',
		Type: '',
		AssignedToId: '',
	}
	let users: UserType[] = []
	let projects: ProjectType[] = []
	const { uuid } = params
	const { getItem } = useSessionStorage()
	const [session] = useState<UserSessionType>(getItem(sessionKey, 'session'))
	const [modified, setModified] = useState(false)
	const [updates, setUpdates] = useState<IssueType>({
		SequenceNumber: '',
		ProjectId: '',
		Title: '',
		Details: '',
		Priority: '',
		Status: '',
		Complexity: '',
		Type: '',
		AssignedToId: '',
	})
	const issueReq = useSWR(uuid ? `${apiUrl}/issue/${uuid}` : null, fetcher)
	const userReq = useSWR(`${apiUrl}/user`, fetcher)
	const projectReq = useSWR(`${apiUrl}/project`, fetcher)
	if (issueReq.isLoading || userReq.isLoading || projectReq.isLoading)
		return <LoadingIndicator />
	if (issueReq.error || userReq.error || projectReq.error)
		return <div>Error</div>

	issue = issueReq.data
	projects = projectReq.data
	users = userReq.data

	const fieldChanged = (ev: any) => {
		const { name, value } = ev.target
		console.log('fieldChanged', name, value)
		setUpdates({
			...updates,
			[name]: value,
		})
		setModified(true)
	}

	const updateIssue = async () => {
		const { UUID } = issue
		const {
			ProjectId,
			Title,
			Details,
			Priority,
			Status,
			Type,
			Complexity,
			AssignedToId,
		} = updates
		const payload = RemoveBlanks({
			ProjectId,
			Title,
			Details,
			Priority,
			Status,
			Type,
			Complexity,
			AssignedToId,
		})
		console.log({ payload })
		const result = await fetch(`${apiUrl}/issue/${UUID}`, {
			method: 'PATCH',
			body: JSON.stringify(payload),
			headers: buildHeaders(session),
		})
		if (result.ok) {
			setUpdates({
				SequenceNumber: '',
				ProjectId: '',
				Title: '',
				Details: '',
				Priority: '',
				Status: '',
				Complexity: '',
				Type: '',
				AssignedToId: '',
			})
			setModified(false)
		}
	}

	return (
		<div className="card">
			<div className="flex">
				<span className="mr-1">
					<FiList size="1.5em" />
				</span>
				<h2>Edit Issue {issue.SequenceNumber}</h2>
			</div>
			<div className="mb-4">
				<label htmlFor="ProjectId" className="block">
					Project
				</label>
				<select
					name="ProjectId"
					id="ProjectId"
					defaultValue={issue.ProjectId}
					onChange={fieldChanged}
				>
					<option value="">- select -</option>
					{projects.map((p) => (
						<option key={p.UUID} value={p.Id}>
							{p.Sequence ? p.Sequence.Prefix : ''} | {p.Name}
						</option>
					))}
				</select>
			</div>
			<div className="mb-4">
				<label htmlFor="Title" className="block">
					Title
				</label>
				<input
					type="text"
					name="Title"
					id="Title"
					className="w-full"
					defaultValue={issue.Title}
					onChange={fieldChanged}
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="Details" className="block">
					Details
				</label>
				<textarea
					name="Details"
					id="Details"
					defaultValue={issue.Details}
					className="w-full h-20"
					onChange={fieldChanged}
				></textarea>
			</div>
			<div className="flex flex-wrap justify-between mb-4">
				<div>
					<label htmlFor="Priority" className="block">
						Priority
					</label>
					<select
						name="Priority"
						id="Priority"
						onChange={fieldChanged}
						defaultValue={issue.Priority}
					>
						<option value="">- select -</option>
						{PriorityArray.map((p, i) => (
							<option key={i} value={p}>
								{p}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="Status" className="block">
						Status
					</label>
					<select
						name="Status"
						id="Status"
						onChange={fieldChanged}
						defaultValue={issue.Status}
					>
						<option value="">- select -</option>
						{StatusArray.map((s, i) => (
							<option key={i} value={s}>
								{s}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="Type" className="block">
						Type
					</label>
					<select
						name="Type"
						id="Type"
						onChange={fieldChanged}
						defaultValue={issue.Type}
					>
						<option value="">- select -</option>
						{IssueTypeArray.map((t, i) => (
							<option key={i} value={t}>
								{t}
							</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="Complexity" className="block">
						Complexity
					</label>
					<select
						name="Complexity"
						id="Complexity"
						onChange={fieldChanged}
						defaultValue={issue.Complexity}
					>
						<option value="">- select -</option>
						{ComplexityArray.map((c, i) => (
							<option key={i} value={c}>
								{c}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="mb-4">
				<label htmlFor="AssignedToId" className="block">
					Assigned To
				</label>
				<select
					name="AssignedToId"
					id="AssignedToId"
					onChange={fieldChanged}
					defaultValue={issue.AssignedToId}
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
				{modified && <button onClick={updateIssue}>Update Issue</button>}
			</div>
		</div>
	)
}
