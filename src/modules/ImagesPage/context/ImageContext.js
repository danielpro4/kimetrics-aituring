import { createContext, useContext, useState } from 'react'
import { DEFAULT_FILTERS } from '../CONSTANTS'

export const ImageContext = createContext({
    v: '0.1',
})

export const useImageContext = () => {
    return useContext(ImageContext)
}

export const ImageProvider = ({ children }) => {
    const [filterVisible, setFilterVisible] = useState(false)
    const [filters, setFilters] = useState({
        date_ini: DEFAULT_FILTERS.start,
        date_end: DEFAULT_FILTERS.end,
        place_id: null,
    })

    const [searchPlace, setSearchPlace] = useState('')

    return (
        <ImageContext.Provider
            value={{
                filterVisible,
                setFilterVisible,
                filters,
                setFilters,
                searchPlace,
                setSearchPlace,
            }}
        >
            {children}
        </ImageContext.Provider>
    )
}

export default ImageProvider
