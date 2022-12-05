import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import { SearchContextProvider } from '../contexts/SearchContext'

function MainLayout({ children }) {
    return (
        <SearchContextProvider>
            <Navbar />
            {children}
        </SearchContextProvider>
    )
}

export default MainLayout