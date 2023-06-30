import useSWR from 'swr'
import { apiUrl } from './api-url'
import { fetcher } from './fetcher'

export const useSwrWithQuery = (path: string, query: string) => {
	const params = new URLSearchParams(query)
	params.sort()

	const { data, error, isLoading } = useSWR(
		`${apiUrl}/${path}?${params.toString()}`,
		fetcher
	)

	return { data, error, isLoading }
}
