import useHttp from '@hooks/useHttp'

export const useIframeURL = () => {
    const { http, token } = useHttp()

    const getTask = (id) => {
        return http.get(`/task/${id}/`)
    }

    return {
        get: async (host, task_id) => {
            const task = await getTask(task_id)
            return `${host}?jwt=${token}&canal=${task?.canalID}`
        },
    }
}
