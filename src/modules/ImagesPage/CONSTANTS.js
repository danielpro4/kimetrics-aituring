import dayjs from 'dayjs'

export const DEFAULT_FILTERS = {
    start: dayjs().startOf('week').format('YYYY-MM-DD'),
    end: dayjs().endOf('week').format('YYYY-MM-DD'),
}
