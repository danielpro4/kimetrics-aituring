import dayjs from 'dayjs'
import * as XLSX from 'xlsx'

export const FORMAT_HUMAN = 'DD-MM-YYYY'

export const dateInHumanFormat = (value, format = null) => {
    if (typeof value === 'string') {
        return dayjs(value).format(format ?? FORMAT_HUMAN)
    }

    return value?.format(format ?? FORMAT_HUMAN)
}

export const getFileName = (prefix = 'images') => `${prefix}_${dayjs().format('DD-MM-YYYY HH:mm')}.xlsx`

export function s2ab(s) {
    let buf = new ArrayBuffer(s.length)
    let view = new Uint8Array(buf)

    for (let i = 0; i != s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xff
    }

    return buf
}

export const createWorkBook = (data, fileName) => {
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
