import { useQuery } from 'react-query'
import useHttp from '@hooks/http.hook'
import { stringify } from 'query-string'

/**
   Filtros disponibles en API
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

    const fetchData = (params = {}) => {
        console.log('params::', params)
        return http.get('/image/?page_size=10', {
            params: filters,
            paramsSerializer: (params) => stringify(params, { skipNull: true, arrayFormat: 'none' }),
        })
    }

    const { isLoading, error, data } = useQuery([queryKey, filters], () => fetchData(filters), {
        retry: 0,
    })

    return {
        isLoading,
        error,
        data,
    }
}
