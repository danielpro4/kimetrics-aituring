import dayjs from 'dayjs'

export const FORMAT_HUMAN = 'DD-MM-YYYY'

export const dateInHumanFormat = (value, format = null) => {
    if (typeof value === 'string') {
        return dayjs(value).format(format ?? FORMAT_HUMAN)
    }

    return value?.format(format ?? FORMAT_HUMAN)
}

export function s2ab(s) {
    let buf = new ArrayBuffer(s.length)
    let view = new Uint8Array(buf)

    for (let i = 0; i != s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xff
    }

    return buf
}
