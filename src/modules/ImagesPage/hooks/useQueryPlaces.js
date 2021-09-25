import { useQuery } from 'react-query'
import useHttp from '@hooks/http.hook'

export const useQueryPlaces = (queryKey, filters = {}) => {
    const { http } = useHttp()

    const fetchData = (params = {}) => {
        const query = Object.keys(params)
            .filter((item) => params[item])
            .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
            .join('&')

        //console.log('query::', query)
        return http.get('/place?' + query)
    }

    const { isLoading, error, data } = useQuery(queryKey, () => fetchData(filters), {
        retry: 0,
    })

    return {
        isLoading,
        error,
        data,
    }
}
