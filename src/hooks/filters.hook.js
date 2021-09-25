import { useRouter } from 'next/router'
import { flatten, fromPairs, isEmpty, isNil, mergeDeepRight, not, pick, toPairs } from 'ramda'
import { useEffect, useState } from 'react'

import { DEFAULT_FILTERS } from '@modules/ImagesPage/CONSTANTS'

export const useFilters = (keys) => {
    const router = useRouter()
    const initialFilter = keys.reduce((old, curr) => ({ ...old, [curr]: null }), {})
    const [filters, setFilters] = useState({
        ...initialFilter,
        date_ini: DEFAULT_FILTERS.start,
        date_end: DEFAULT_FILTERS.end,
    })

    useEffect(() => {
        const routeFilters = fromPairs(toPairs(router.query).map(([key, value]) => [key, flatten([value])]))
        //updateFilters(routeFilters)
    }, [router.query])

    const updateFilters = (newFilters) => {
        const focusFields = pick(keys, newFilters)
        const sanitizedFilters = fromPairs(
            toPairs(focusFields).filter(([_, value]) => not(isNil(value) || isEmpty(value)))
        )
        setFilters(mergeDeepRight(initialFilter, sanitizedFilters))
        return sanitizedFilters
    }

    const allFieldsAreEmpty = (filters) => toPairs(filters).reduce((old, [_, value]) => isEmpty(value), false)

    return {
        apply: (newFilters) => {
            const updatedFilters = updateFilters(newFilters)
            /*router.push({
                pathname: router.pathname,
                query: updatedFilters,
            })*/
        },
        current: filters,
        isEmpty: allFieldsAreEmpty(filters),
    }
}
