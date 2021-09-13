import dayjs from 'dayjs'

export const FORMAT_HUMAN = 'DD-MM-YYYY'

export const dateInHumanFormat = (value) => {
    if (typeof value === 'string') {
        return dayjs(value).format(FORMAT_HUMAN)
    }

    return value.format(FORMAT_HUMAN)
}
