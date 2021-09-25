import { createContext, useContext, useState } from 'react'

export const ImageContext = createContext({
    v: '0.1',
})

export const useImageContext = () => {
    return useContext(ImageContext)
}

export const ImageProvider = ({ children }) => {
    const [filterVisible, setFilterVisible] = useState(false)
    const [searchPlace, setSearchPlace] = useState('')

    return (
        <ImageContext.Provider
            value={{
                filterVisible,
                setFilterVisible,
                searchPlace,
                setSearchPlace,
            }}
        >
            {children}
        </ImageContext.Provider>
    )
}

export default ImageProvider
