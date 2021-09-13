import dayjs from 'dayjs'

export const FORMAT_HUMAN = 'DD-MM-YYYY'

export const dateInHumanFormat = (value, format = null) => {
    if (typeof value === 'string') {
        return dayjs(value).format(format ?? FORMAT_HUMAN)
    }

    return value?.format(format ?? FORMAT_HUMAN)
}
