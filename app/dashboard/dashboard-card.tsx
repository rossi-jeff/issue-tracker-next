import { getFullName } from '../../lib/get-full-name'
import { IssueType } from '../../types/issue.type'

export default function DashboardCard({
	issue,
	from,
	draggable,
	dragStart,
}: {
	issue: IssueType
	from: string
	draggable: boolean
	dragStart: Function
}) {
	const author = issue.Author ? getFullName(issue.Author) : 'N/A'
	const assignedTo = issue.AssignedTo ? getFullName(issue.AssignedTo) : 'N/A'
	const project = issue.Project ? issue.Project.Name : 'N/A'

	const toggle = (id: string) => {
		const el = document.getElementById(id)
		if (el) el.classList.toggle('open')
	}

	const toggleContent = () => {
		toggle(`dashboard-issue-content-${issue.UUID}`)
	}

	const toggleDescription = () => {
		toggle(`dashboard-issue-description-${issue.UUID}`)
	}

	const toggleDetails = () => {
		toggle(`dashboard-issue-details-${issue.UUID}`)
	}

	const handleDragStart = (ev: any) => dragStart(ev)

	return (
		<div
			className="card"
			id={from + '_' + issue.UUID}
			draggable={draggable}
			onDragStart={handleDragStart}
		>
			<button onClick={toggleContent}>{issue.SequenceNumber}</button>
			<div
				className="dashboard-issue-content"
				id={'dashboard-issue-content-' + issue.UUID}
			>
				<div>{issue.Title}</div>
				<button onClick={toggleDescription}>Description</button>
				<div
					className="dashboard-issue-description"
					id={'dashboard-issue-description-' + issue.UUID}
				>
					{issue.Details}
				</div>
				<button onClick={toggleDetails}>Details</button>
				<div
					className="dashboard-issue-details"
					id={'dashboard-issue-details-' + issue.UUID}
				>
					<div>
						<strong className="mr-2">Project</strong>
						{project}
					</div>
					<div>
						<strong className="mr-2">Priority</strong>
						{issue.Priority}
					</div>
					<div>
						<strong className="mr-2">Status</strong>
						{issue.Status}
					</div>
					<div>
						<strong className="mr-2">Type</strong>
						{issue.Type}
					</div>
					<div>
						<strong className="mr-2">Complexity</strong>
						{issue.Complexity}
					</div>
					<div>
						<strong className="mr-2">Created</strong>
						{issue.Created}
					</div>
					<div>
						<strong className="mr-2">Author</strong>
						{author}
					</div>
					<div>
						<strong className="mr-2">Assigned</strong>
						{assignedTo}
					</div>
				</div>
			</div>
		</div>
	)
}
