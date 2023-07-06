import { Metadata } from 'next'
import NewTimeClockContent from './new-time-clock-content'

export const metadata: Metadata = {
	title: 'Issue Tracker | New Time Clock',
}

export default function NewTimeClockPage() {
	return <NewTimeClockContent />
}
