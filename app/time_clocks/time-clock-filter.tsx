import { getFullName } from '@/lib/get-full-name'
import { IssueType } from '@/types/issue.type'
import { ProjectType } from '@/types/project.type'
import { UserType } from '@/types/user.type'
import { useState } from 'react'

export default function TimeClockFilter({
	users,
	projects,
	issues,
	filterTimeClocks,
}: {
	users: UserType[]
	projects: ProjectType[]
	issues: IssueType[]
	filterTimeClocks: Function
}) {
	const params = new URLSearchParams(location.search)
	const [filter, setFilter] = useState<{ [key: string]: string }>({
		UserId: params.get('UserId') || '',
		ProjectId: params.get('ProjectId') || '',
		IssueId: params.get('IssueId') || '',
		StartDate: params.get('StartDate') || '',
		EndDate: params.get('EndDate') || '',
	})

	const toggle = () => {
		const el = document.getElementById('time-clock-filter-content')
		if (el) el.classList.toggle('open')
	}

	const selectChanged = (ev: any) => {
		const { name, selectedIndex } = ev.target
		let value
		switch (name) {
			case 'UserId':
				value = selectedIndex > 0 ? users[selectedIndex - 1].Id : ''
				break
			case 'ProjectId':
				value = selectedIndex > 0 ? projects[selectedIndex - 1].Id : ''
				break
			case 'IssueId':
				value = selectedIndex > 0 ? issues[selectedIndex - 1].Id : ''
				break
		}
		const update = {
			...filter,
			[name]: value,
		}
		setFilter(update)
		sendTimeClockFilters(update)
	}

	const dateChanged = (ev: any) => {
		const { name, value } = ev.target
		const update = {
			...filter,
			[name]: value,
		}
		setFilter(update)
		sendTimeClockFilters(update)
	}

	const clearFilters = () => {
		setFilter({
			UserId: '',
			ProjectId: '',
			IssueId: '',
			StartDate: '',
			EndDate: '',
		})
		sendTimeClockFilters({})
		// defaultValue does not set selected index
		const selects = document.getElementsByClassName('filter-select')
		for (let i = 0; i < selects.length; i++) {
			const select = document.getElementById(selects[i].id) as HTMLSelectElement
			if (select) select.selectedIndex = 0
		}
		const dates = document.getElementsByClassName('filter-date')
		for (let i = 0; i < dates.length; i++) {
			const date = document.getElementById(dates[i].id) as HTMLInputElement
			if (date) date.value = ''
		}
	}

	const sendTimeClockFilters = (update: { [key: string]: string }) => {
		const sanitized: { [key: string]: string } = {}
		for (const key in update) {
			if (update[key] != '') sanitized[key] = update[key]
		}
		filterTimeClocks(sanitized)
	}

	return (
		<div className="card" id="time-clock-filter">
			<button onClick={toggle}>Filter</button>
			<div className="filter-content" id="time-clock-filter-content">
				<div className="flex flex-wrap justify-between">
					<div>
						<label htmlFor="UserId">User</label>
						<select
							name="UserId"
							id="UserId"
							className="filter-select"
							onChange={selectChanged}
							defaultValue={filter.UserId || ''}
						>
							<option value="">- select -</option>
							{users.map((u) => (
								<option key={u.UUID} value={String(u.Id)}>
									{getFullName(u)}
								</option>
							))}
						</select>
					</div>
					<div>
						<label htmlFor="ProjectId">Project</label>
						<select
							name="ProjectId"
							id="ProjectId"
							className="filter-select"
							onChange={selectChanged}
							defaultValue={filter.ProjectId || ''}
						>
							<option value="">- select -</option>
							{projects.map((p) => (
								<option key={p.UUID} value={String(p.Id)}>
									{p.Sequence ? p.Sequence.Prefix : 'N/A'} | {p.Name}
								</option>
							))}
						</select>
					</div>
					<div>
						<label htmlFor="IssueId">Issue</label>
						<select
							name="IssueId"
							id="IssueId"
							className="filter-select"
							defaultValue={filter.IssueId || ''}
							onChange={selectChanged}
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
				<div className="flex flex-wrap justify-between">
					<div>
						<label htmlFor="StartDate">Start Date</label>
						<input
							type="date"
							name="StartDate"
							id="StartDate"
							className="filter-date"
							defaultValue={filter.StartDate || ''}
							onChange={dateChanged}
						/>
					</div>
					<div>
						<label htmlFor="EndDate">End Date</label>
						<input
							type="date"
							name="EndDate"
							id="EndDate"
							className="filter-date"
							defaultValue={filter.EndDate || ''}
							onChange={dateChanged}
						/>
					</div>
					<div>
						<label>&nbsp;</label>
						<button onClick={clearFilters}>Clear Filters</button>
					</div>
				</div>
			</div>
		</div>
	)
}
