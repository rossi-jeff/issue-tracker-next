'use client'

import useSWR from 'swr'
import { apiUrl } from '../../lib/api-url'
import { fetcher } from '../../lib/fetcher'
import { IssueType } from '../../types/issue.type'
import DashboardCard from './dashboard-card'
import {
	UserSessionType,
	sessionKey,
	useSessionStorage,
} from '../../lib/session.storage'
import { useState } from 'react'
import { buildHeaders } from '../../lib/build-headers'
import { OtherStatusArray } from '../../types/array.types'
import { FiGrid } from 'react-icons/fi'

export default function DashboardPage() {
	const { getItem } = useSessionStorage()
	const [session] = useState<UserSessionType>(getItem(sessionKey, 'session'))
	const [dropped, setDropped] = useState<{
		from: string
		to: string
		uuid: string
	}>({
		from: '',
		to: '',
		uuid: '',
	})
	const [other, setOther] = useState<string>('')
	const { data, error, isLoading, mutate } = useSWR(`${apiUrl}/issue`, fetcher)
	if (isLoading) return <div>Loading...</div>
	if (error) return <div>{error}</div>

	let sorted: { [key: string]: IssueType[] } = {
		New: [],
		Assigned: [],
		Accepted: [],
		Fixed: [],
		Other: [],
	}

	const sortIssues = (
		issues: IssueType[],
		sorted: { [key: string]: IssueType[] }
	) => {
		for (const issue of issues) {
			switch (issue.Status) {
				case 'New':
					sorted.New.push(issue)
					break
				case 'Assigned':
					sorted.Assigned.push(issue)
					break
				case 'Accepted':
					sorted.Accepted.push(issue)
					break
				case 'Fixed':
					sorted.Fixed.push(issue)
					break
				default:
					sorted.Other.push(issue)
					break
			}
		}
		return sorted
	}

	sorted = sortIssues(data, sorted)

	const dragStart = (ev: any) => {
		const { id } = ev.target
		if (id) ev.dataTransfer.setData('text', id)
	}

	const dragOver = (ev: any) => {
		ev.preventDefault()
	}

	const dragEnter = (ev: any) => {
		let { target } = ev
		if (target) {
			while (!target.classList.contains('dashboard-column')) {
				target = target.parentElement
			}
			target.classList.add('over')
			setTimeout(() => {
				target.classList.remove('over')
			}, 500)
		}
	}

	const drop = (ev: any) => {
		ev.preventDefault()
		ev.stopPropagation()
		const data = ev.dataTransfer.getData('text')
		const [from, uuid] = data.split('_')
		let to = ''
		let { target } = ev
		if (target) {
			while (!target.classList.contains('dashboard-column')) {
				target = target.parentElement
			}
			to = target.id
		}
		setDropped({ from, to, uuid })
		moveIssue(uuid, from, to)
		setIssueStatus(uuid, from, to)
	}

	const moveIssue = (uuid: string, from: string, to: string) => {
		console.log('moveIssue', uuid, from, to)
		let issue: IssueType | undefined, idx: number
		switch (from) {
			case 'New':
				idx = sorted.New.findIndex((i) => i.UUID == uuid)
				if (idx != -1) {
					issue = sorted.New[idx]
					sorted.New.splice(idx, 1)
				}
				break
			case 'Assigned':
				idx = sorted.Assigned.findIndex((i) => i.UUID == uuid)
				if (idx != -1) {
					issue = sorted.Assigned[idx]
					sorted.Assigned.splice(idx, 1)
				}
				break
			case 'Accepted':
				idx = sorted.Accepted.findIndex((i) => i.UUID == uuid)
				if (idx != -1) {
					issue = sorted.Accepted[idx]
					sorted.Accepted.splice(idx, 1)
				}
				break
			case 'Fixed':
				idx = sorted.Fixed.findIndex((i) => i.UUID == uuid)
				if (idx != -1) {
					issue = sorted.Fixed[idx]
					sorted.Fixed.splice(idx, 1)
				}
				break
			case 'Other':
				idx = sorted.Other.findIndex((i) => i.UUID == uuid)
				if (idx != -1) {
					issue = sorted.Other[idx]
					sorted.Other.splice(idx, 1)
				}
				break
		}
		if (issue) {
			switch (to) {
				case 'New':
					sorted.New.push(issue)
					break
				case 'Assigned':
					sorted.Assigned.push(issue)
					break
				case 'Accepted':
					sorted.Accepted.push(issue)
					break
				case 'Fixed':
					sorted.Fixed.push(issue)
					break
				case 'Other':
					sorted.Other.push(issue)
					break
			}
		}
	}

	const setIssueStatus = (uuid: string, from: string, to: string) => {
		console.log('setIssueStatus', uuid, from, to)
		if (to == 'Other') {
			selectOtherStatus()
		} else updateIssueStatus(uuid, to)
	}

	const updateIssueStatus = async (uuid: string, Status: string) => {
		const result = await fetch(`${apiUrl}/issue/${uuid}`, {
			method: 'PATCH',
			body: JSON.stringify({ Status }),
			headers: buildHeaders(session),
		})
		if (result.ok) {
			const issue = await result.json()
			const idx = data.findIndex((i: IssueType) => i.UUID == issue.UUID)
			if (idx != -1) data[idx] = issue
			mutate(data)
		}
	}

	const selectOtherStatus = () => {
		const overlay = document.getElementById('dashboard-overlay')
		const dialog = document.getElementById('other-status-dialog')
		if (overlay && dialog) {
			overlay.classList.add('open')
			dialog.classList.add('open')
		}
	}

	const setOtherStatus = () => {
		if (!other || !dropped.uuid) return
		updateIssueStatus(dropped.uuid, other)
		const overlay = document.getElementById('dashboard-overlay')
		const dialog = document.getElementById('other-status-dialog')
		if (overlay && dialog) {
			overlay.classList.remove('open')
			dialog.classList.remove('open')
		}
	}

	const otherRadioChanged = (ev: any) => {
		const { value } = ev.target
		setOther(value)
	}

	return (
		<div>
			<div className="flex flex-wrap">
				<span className="mr-1 mt-1">
					<FiGrid size="1.5em" />
				</span>
				<h1>Dashboard</h1>
			</div>
			<div className="flex flex-wrap justify-between">
				<div className="w-[23%]">
					<h2>New</h2>
					<div
						className="dashboard-column"
						id="New"
						onDragOver={dragOver}
						onDragEnter={dragEnter}
						onDrop={drop}
					>
						{sorted.New.map((issue) => (
							<DashboardCard
								key={issue.Id}
								issue={issue}
								from="New"
								draggable={session.signedIn}
								dragStart={dragStart}
							/>
						))}
					</div>
				</div>
				<div className="w-[23%]">
					<h2>Assigned</h2>
					<div
						className="dashboard-column"
						id="Assigned"
						onDragOver={dragOver}
						onDragEnter={dragEnter}
						onDrop={drop}
					>
						{sorted.Assigned.map((issue) => (
							<DashboardCard
								key={issue.Id}
								issue={issue}
								from="Assigned"
								draggable={session.signedIn}
								dragStart={dragStart}
							/>
						))}
					</div>
				</div>
				<div className="w-[23%]">
					<h2>Accepted</h2>
					<div
						className="dashboard-column"
						id="Accepted"
						onDragOver={dragOver}
						onDragEnter={dragEnter}
						onDrop={drop}
					>
						{sorted.Accepted.map((issue) => (
							<DashboardCard
								key={issue.Id}
								issue={issue}
								from="Accepted"
								draggable={session.signedIn}
								dragStart={dragStart}
							/>
						))}
					</div>
				</div>
				<div className="w-[23%]">
					<h2>Fixed</h2>
					<div
						className="dashboard-column"
						id="Fixed"
						onDragOver={dragOver}
						onDragEnter={dragEnter}
						onDrop={drop}
					>
						{sorted.Fixed.map((issue) => (
							<DashboardCard
								key={issue.Id}
								issue={issue}
								from="Fixed"
								draggable={session.signedIn}
								dragStart={dragStart}
							/>
						))}
					</div>
				</div>
			</div>
			<div>
				<h2>Other</h2>
				<div
					className="dashboard-column"
					id="Other"
					onDragOver={dragOver}
					onDragEnter={dragEnter}
					onDrop={drop}
				>
					{sorted.Other.map((issue) => (
						<DashboardCard
							key={issue.Id}
							issue={issue}
							from="Other"
							draggable={session.signedIn}
							dragStart={dragStart}
						/>
					))}
				</div>
			</div>
			<div className="modal-overlay" id="dashboard-overlay">
				<div className="modal-fit" id="other-status-dialog">
					<h2>Select Status</h2>
					{OtherStatusArray.map((s, i) => (
						<div key={i}>
							<input
								type="radio"
								name="other-status"
								id={'other-status-' + s}
								value={s}
								onChange={otherRadioChanged}
							/>
							<label htmlFor={'other-status-' + s}>{s}</label>
						</div>
					))}
					<button onClick={setOtherStatus}>Set Other Status</button>
				</div>
			</div>
		</div>
	)
}
