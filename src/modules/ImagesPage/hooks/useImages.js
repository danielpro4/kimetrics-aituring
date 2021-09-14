import { useQuery } from 'react-query'
import useHttp from '@hooks/useHttp'

export const useImages = (params = {}) => {
    const { http } = useHttp()

    const getImages = () => {
        return http.get('/image')
    }

    const { isLoading, error, data } = useQuery('fetchImages', () => getImages(), {
        retry: 0,
    })

    return {
        isLoading,
        error,
        data,
    }
}
