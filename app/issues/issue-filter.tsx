import { getFullName } from '@/lib/get-full-name'
import {
	ComplexityArray,
	IssueTypeArray,
	PriorityArray,
	StatusArray,
} from '@/types/array.types'
import { UserType } from '@/types/user.type'
import { useState } from 'react'
import { FiFilter, FiRefreshCcw } from 'react-icons/fi'

export default function IssueFilter({
	users,
	filterIssues,
}: {
	users: UserType[]
	filterIssues: Function
}) {
	const params = new URLSearchParams(location.search)
	const [filter, setFilter] = useState<{ [key: string]: string }>({
		Priority: params.get('Priority') || '',
		Status: params.get('Status') || '',
		Type: params.get('Type') || '',
		Complexity: params.get('Complexity') || '',
		AuthorId: params.get('AuthorId') || '',
		AssignedToId: params.get('AssignedToId') || '',
	})
	const toggle = () => {
		const el = document.getElementById('issue-filter-content')
		if (el) el.classList.toggle('open')
	}

	const selectChanged = (ev: any) => {
		const { name, selectedIndex } = ev.target
		let value
		switch (name) {
			case 'Priority':
				value = selectedIndex > 0 ? PriorityArray[selectedIndex - 1] : ''
				break
			case 'Status':
				value = selectedIndex > 0 ? StatusArray[selectedIndex - 1] : ''
				break
			case 'Type':
				value = selectedIndex > 0 ? IssueTypeArray[selectedIndex - 1] : ''
				break
			case 'Complexity':
				value = selectedIndex > 0 ? ComplexityArray[selectedIndex - 1] : ''
				break
			case 'AuthorId':
			case 'AssignedToId':
				value = selectedIndex > 0 ? users[selectedIndex - 1].Id : ''
				break
		}
		const update = {
			...filter,
			[name]: value,
		}
		setFilter(update)
		sendIssueFilters(update)
	}

	const clearFilters = () => {
		setFilter({
			Priority: '',
			Status: '',
			Type: '',
			Complexity: '',
			AuthorId: '',
			AssignedToId: '',
		})
		sendIssueFilters({})
		// defaultValue does not set selected index
		const selects = document.getElementsByClassName('filter-select')
		for (let i = 0; i < selects.length; i++) {
			const select = document.getElementById(selects[i].id) as HTMLSelectElement
			if (select) select.selectedIndex = 0
		}
	}

	const sendIssueFilters = (update: { [key: string]: string }) => {
		const sanitized: { [key: string]: string } = {}
		for (const key in update) {
			if (update[key] != '') sanitized[key] = update[key]
		}
		filterIssues(sanitized)
	}
	return (
		<div className="card" id="issue-filter">
			<button onClick={toggle} className="flex">
				<span className="mr-1 mt-1">
					<FiFilter />
				</span>
				Filter
			</button>
			<div className="filter-content" id="issue-filter-content">
				<div className="flex flex-wrap justify-between">
					<div>
						<label htmlFor="Priority">Priority</label>
						<select
							name="Priority"
							onChange={selectChanged}
							defaultValue={filter.Priority || ''}
							className="filter-select"
							id="Priority"
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
						<label htmlFor="Status">Status</label>
						<select
							name="Status"
							onChange={selectChanged}
							defaultValue={filter.Status || ''}
							className="filter-select"
							id="Status"
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
						<label htmlFor="Type">Type</label>
						<select
							name="Type"
							onChange={selectChanged}
							defaultValue={filter.Type || ''}
							className="filter-select"
							id="Type"
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
						<label htmlFor="Complexity">Complexity</label>
						<select
							name="Complexity"
							onChange={selectChanged}
							defaultValue={filter.Complexity || ''}
							className="filter-select"
							id="Complexity"
						>
							<option value="">- select -</option>
							{ComplexityArray.map((c, i) => (
								<option key={i} value={c}>
									{c}
								</option>
							))}
						</select>
					</div>
					<div>
						<label htmlFor="AuthorId">Author</label>
						<select
							name="AuthorId"
							onChange={selectChanged}
							defaultValue={filter.AuthorId || ''}
							className="filter-select"
							id="AuthorId"
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
						<label htmlFor="AssignedToId">Assigned To</label>
						<select
							name="AssignedToId"
							onChange={selectChanged}
							defaultValue={filter.AssignedToId || ''}
							className="filter-select"
							id="AssignedToId"
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
						<label>&nbsp;</label>
						<button onClick={clearFilters} className="flex">
							Clear Filters
							<span className="ml-1 mt-1">
								<FiRefreshCcw />
							</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
