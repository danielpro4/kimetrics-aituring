import { createContext, useContext, useState } from 'react'

export const ImageContext = createContext({
    filterVisible: false,
})

export const useImageContext = () => useContext(ImageContext)

export const ImageProvider = ({ children }) => {
    const [filterVisible, setFilterVisible] = useState(false)
    return (
        <ImageContext.Provider
            value={{
                filterVisible,
                setFilterVisible,
            }}
        >
            {children}
        </ImageContext.Provider>
    )
}

export default ImageProvider
