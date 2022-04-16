import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Navbar, News, Home, Exchanges, Cryptocurrencies, CryptoDetails } from './components'
import './App.css'





const App = () => {
    return (
        <div className='app'>
            <div className='navbar'>
                <Navbar />
            </div>
            <div className='main'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/exchanges' element={<Exchanges />} />
                    <Route path='/news' element={<News />} />
                    <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
                    <Route path='/crypto/:coinId' element={<CryptoDetails />} />
                    <Route path='cryptocurrencies/crypto/:coinId' element={<CryptoDetails />} />


                </Routes>
                <div className='footer' style={{color: 'white'}}>
                    Copyright by MeoMeo.
                   
                </div>
            </div>


        </div>
    )
}
export default App