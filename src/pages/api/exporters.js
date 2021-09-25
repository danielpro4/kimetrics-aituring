import { createBook, getFileName } from '@utils/functions'
import imageRepository from './infrastructure/imageRepository'

export const config = {
    api: {
        bodyParser: false,
    },
}

const exporters = async (request, response) => {
    const { jwt } = request.query

    try {
        const fileName = getFileName()
        const data = await imageRepository.getAll(jwt)
        const wbbuf = createBook(data, fileName)

        response.statusCode = 200
        response.end({
            fileName,
            data: wbbuf,
        })
    } catch (error) {
        response.status(500).json({
            data: [],
            error: error,
        })
    }
}

export default exporters
