import { useQuery, useQueryClient } from 'react-query'
import useHttp from '@hooks/useHttp'

export const useQueryPlaces = (queryKey, filters = {}) => {
    const { http } = useHttp()
    const queryClient = useQueryClient()

    const fetchData = (params = {}) => {
        const query = Object.keys(params)
            .filter((item) => params[item])
            .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&')

        //console.log('query::', query)
        return http.get('/place?' + query)
    }

    const { isLoading, error, data, refetch } = useQuery(queryKey, () => fetchData(filters), {
        retry: 0,
    })

    return {
        isLoading,
        error,
        data,
        refetch,
        onRefetch: (filters) => {
            queryClient.fetchQuery(queryKey, () => fetchData(filters))
        },
    }
}
