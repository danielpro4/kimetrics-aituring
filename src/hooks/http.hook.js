import axios from 'axios'
import { API_URL_AIT } from '@constants/Settings'
import { useAuthContext } from '@context/AuthContext'

const useHttp = () => {
    const { accessToken } = useAuthContext()

    const config = {
        baseURL: `${API_URL_AIT}`,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    }

    const http = axios.create(config)

    http.interceptors.request.use(
        (request) => {
            if (accessToken) {
                request.headers['Authorization'] = `jwt ${accessToken}`
            }
            return request
        },
        (error) => Promise.reject(error)
    )

    http.interceptors.response.use(
        (response) => {
            return response.data
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    return { http, token: accessToken }
}

export default useHttp
