'use client'

import useSWR from 'swr'
import { apiUrl } from '../../lib/api-url'
import { fetcher } from '../../lib/fetcher'
import { IssueType } from '../../types/issue.type'
import DashboardCard from './dashboard-card'

export default function DashboardPage() {
	const { data, error, isLoading } = useSWR(`${apiUrl}/issue`, fetcher)
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

	return (
		<div>
			<h1>Dashboard</h1>
			<div className="flex flex-wrap justify-between">
				<div className="w-[23%]">
					<h2>New</h2>
					<div className="dashboard-column">
						{sorted.New.map((issue) => (
							<DashboardCard key={issue.Id} issue={issue} />
						))}
					</div>
				</div>
				<div className="w-[23%]">
					<h2>Assigned</h2>
					<div className="dashboard-column">
						{sorted.Assigned.map((issue) => (
							<DashboardCard key={issue.Id} issue={issue} />
						))}
					</div>
				</div>
				<div className="w-[23%]">
					<h2>Accepted</h2>
					<div className="dashboard-column">
						{sorted.Accepted.map((issue) => (
							<DashboardCard key={issue.Id} issue={issue} />
						))}
					</div>
				</div>
				<div className="w-[23%]">
					<h2>Fixed</h2>
					<div className="dashboard-column">
						{sorted.Fixed.map((issue) => (
							<DashboardCard key={issue.Id} issue={issue} />
						))}
					</div>
				</div>
			</div>
			<div>
				<h2>Other</h2>
				<div className="dashboard-column">
					{sorted.Other.map((issue) => (
						<DashboardCard key={issue.Id} issue={issue} />
					))}
				</div>
			</div>
		</div>
	)
}
