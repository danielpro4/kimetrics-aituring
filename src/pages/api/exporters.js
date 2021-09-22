import Cors from 'cors'
import * as XLSX from 'xlsx'
import got from 'got'
import dayjs from 'dayjs'
import { API_URL_AIT } from '@constants/Settings'
import initMiddleware from '@libs/init-middleware'

export const config = {
    api: {
        bodyParser: false,
    },
}

const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'OPTIONS'],
    })
)

const fetchData = async (token) => {
    let data = []
    try {
        const response = await got(API_URL_AIT + '/image', {
            headers: {
                authorization: `jwt ${token}`,
            },
            responseType: 'json',
        })

        if (response.body?.results) {
            data = response.body.results.map((item) => ({
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

const createBook = (data, fileName) => {
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(data)

    XLSX.utils.book_append_sheet(wb, ws, fileName)

    const wbbuf = XLSX.write(wb, {
        type: 'binary',
        bookType: 'xlsx',
        bookSST: true,
    })

    return wbbuf
}

const getFileName = () => `images_${dayjs().format('DD-MM-YYYY HH:mm')}.xlsx`

const exporters = async (request, response) => {
    const { jwt } = request.query

    try {
        await cors(request, response)

        if (request.method === 'POST') {
            const data = await fetchData(jwt)

            const fileName = getFileName()
            const wbbuf = createBook(data, fileName)

            response.status(200).send({
                file: fileName,
                wbbuf: wbbuf,
            })
        }

        response.status(200).json({
            data: [],
            message: 'no-allowed',
        })
    } catch (error) {
        console.log(error)
        response.status(500).json({
            data: [],
            error: 'Something went wrong',
        })
    }
}

export default exporters
