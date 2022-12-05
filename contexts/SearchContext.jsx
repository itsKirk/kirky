import { createContext, useEffect, useState } from "react";

export const SearchContext = createContext()
export const SearchContextProvider = ({ children }) => {
    const [searchTerm, setSearchTerm] = useState('Michael Jackson')
    useEffect(() => {
        setSearchTerm(searchTerm)
    }, [searchTerm])
    return (
        <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </SearchContext.Provider>
    )
}
