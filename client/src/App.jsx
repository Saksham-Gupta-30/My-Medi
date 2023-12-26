import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header.jsx'
import { Home, Files, Upload, Share, Remove } from './pages'
import { useStateContext } from './context/index.jsx'

const App = () => {
  const { address } = useStateContext()

  return (
    <div className='w-full bg-[#fffff2]'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/files' element={<Files />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/share' element={<Share />} />
        <Route path='/remove' element={<Remove />} />
      </Routes>
    </div>
  )
}

export default App