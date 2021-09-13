import { createContext, useContext, useState } from 'react'

export const AuthContext = createContext({ accessToken: null })

export const useAuthContext = () => useContext(AuthContext)

export const AuthProvider = ({ children, session }) => {
    const [accessToken, setAccessToken] = useState(session?.accessToken)

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                setAccessToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
