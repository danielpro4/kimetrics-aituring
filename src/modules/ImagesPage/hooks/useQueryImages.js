import { useQuery, useQueryClient } from 'react-query'
import useHttp from '@hooks/useHttp'

/**
 Filtros disponibles
    id=12
    place_id=1
    task_id=20
    user_id=4
    date_ini=2021-09-15
    date_end=2021-09-15
    status=false
    processed=false
    valid=false
*/

export const useQueryImages = (queryKey, filters = {}) => {
    const { http } = useHttp()
    const queryClient = useQueryClient()

    const fetchImages = (params) => {
        const query = Object.keys(params)
            .filter((item) => params[item])
            .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&')

        console.log('query::', query)
        return http.get('/image?' + query)
    }

    const { isLoading, error, data, refetch } = useQuery(queryKey, () => fetchImages(filters), {
        retry: 0,
    })

    return {
        isLoading,
        error,
        data,
        refetch,
        onRefetch: async (filters) => {
            await queryClient.fetchQuery(queryKey, () => fetchImages(filters))
        },
    }
}
