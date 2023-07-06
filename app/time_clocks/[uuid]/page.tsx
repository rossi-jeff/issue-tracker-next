import { Metadata } from 'next'
import EditTimeClockContent from './edit-time-clock-content'
import { apiUrl } from '../../../lib/api-url'
import { TimeClockType } from '../../../types/time-clock.type'

export const metadata: Metadata = {
	title: 'Issue Tracker | Edit Time Clock',
}

export async function generateStaticParams() {
	const result = await fetch(`${apiUrl}/timeclock`)

	if (!result.ok) return []

	const timeClocks: TimeClockType[] = await result.json()

	return timeClocks.map((t) => ({ uuid: t.UUID }))
}

export default function EditTimeClockPage({
	params,
}: {
	params: { uuid: string }
}) {
	return <EditTimeClockContent params={params} />
}
