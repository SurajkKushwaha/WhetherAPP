import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Nav from './components/Nav'
import Page1 from './components/Page1'

const App = () => {


  return (
    <>
    <div className='bgg h-screen w-screen bg-red-300'>
      <Nav/>
      <Page1/>
      

    </div>
    </>
  )
}

export default App
