import got from 'got'
import { API_URL_AIT } from '@constants/Settings'

class ImageRepository {
    async findAll(token) {
        let data = []
        try {
            const response = await got(API_URL_AIT + '/image', {
                headers: {
                    authorization: `jwt ${token}`,
                },
                responseType: 'json',
            })

            const { results = [] } = response.body

            if (results.length) {
                data = results.map((item) => ({
                    client_code: item.codigo_cliente,
                    client_name: item.place_name,
                    image_id: item.id,
                    date: item.date,
                    image_url: item.url,
                    task_name: item.task_name,
                    user_image: item.user_name,
                    processed: item.processed ? 'Sí' : 'No',
                    valid: item.valid ? 'Sí' : 'No',
                    latitude: item.lat,
                    longitude: item.lon,
                }))
            }
        } catch (error) {
            console.log(error)
        }

        return data
    }
}

export const imageRepository = new ImageRepository()
