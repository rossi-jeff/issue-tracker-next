import { useEffect, useState } from 'react'
import {
	FiSkipBack,
	FiSkipForward,
	FiRewind,
	FiFastForward,
} from 'react-icons/fi'

export default function PaginationControls({
	offset,
	limit,
	count,
	pageChanged,
	limitChanged,
}: {
	offset: number
	limit: number
	count: number
	pageChanged: Function
	limitChanged: Function
}) {
	const [pages, setPages] = useState<number[]>([])
	const [current, setCurrent] = useState<{
		page: number
		perPage: number
		first: number
		last: number
	}>({
		page: 1,
		perPage: 10,
		first: 0,
		last: 0,
	})
	const perPageOptions: number[] = [5, 10, 25]

	const firstPage = () => {
		pageChanged(1)
	}

	const previousPage = () => {
		if (current.page == 1) return
		pageChanged(current.page - 1)
	}

	const nextPage = () => {
		if (current.page + 1 > pages[pages.length - 1]) return
		pageChanged(current.page + 1)
	}

	const lastPage = () => {
		pageChanged(pages[pages.length - 1])
	}

	const pageSelectChanged = (ev: any) => {
		const idx = ev.target.selectedIndex
		pageChanged(pages[idx])
	}

	const perPageSelectChanged = (ev: any) => {
		const idx = ev.target.selectedIndex
		limitChanged(perPageOptions[idx])
	}

	useEffect(() => {
		const pageArray: number[] = []
		let counter = 0
		let page = 1
		while (counter < count) {
			pageArray.push(page)
			counter += limit
			page++
		}
		setPages(pageArray)
		let currentPage = Math.floor(offset / limit) + 1
		setCurrent({
			page: currentPage,
			perPage: limit,
			first: (currentPage - 1) * limit + 1,
			last: Math.min((currentPage - 1) * limit + limit, count),
		})
	}, [offset, limit, count])
	return (
		<div className="card" id="pagination-controls">
			<div className="flex flex-wrap justify-between">
				<div>
					<button onClick={firstPage} className="flex">
						<span className="mr-1 mt-1">
							<FiSkipBack />
						</span>
						First
					</button>
				</div>
				<div>
					<button onClick={previousPage} className="flex">
						<span className="mr-1 mt-1">
							<FiRewind />
						</span>
						Previous
					</button>
				</div>
				<div>
					<label htmlFor="PerPage" className="mr-1">
						Per Page
					</label>
					<select
						name="PerPage"
						onChange={perPageSelectChanged}
						defaultValue={current.perPage}
					>
						{perPageOptions.map((p) => (
							<option key={p} value={p}>
								{p}
							</option>
						))}
					</select>
				</div>
				<div>
					<strong>{current.first}</strong> to <strong>{current.last}</strong> of{' '}
					<strong>{count}</strong>
				</div>
				<div>
					<label htmlFor="Page" className="mr-1">
						Page
					</label>
					<select
						name="Page"
						onChange={pageSelectChanged}
						defaultValue={current.page}
					>
						{pages.map((p) => (
							<option key={p} value={p}>
								{p}
							</option>
						))}
					</select>
				</div>
				<div>
					<button onClick={nextPage} className="flex">
						Next
						<span className="ml-1 mt-1">
							<FiFastForward />
						</span>
					</button>
				</div>
				<div>
					<button onClick={lastPage} className="flex">
						Last
						<span className="ml-1 mt-1">
							<FiSkipForward />
						</span>
					</button>
				</div>
			</div>
		</div>
	)
}
