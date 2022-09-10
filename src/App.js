import React from 'react'
import { BrowserRouter,  Route, Routes } from "react-router-dom"
import {Box, Typography} from "@mui/material"
import Header from './components/Header/Header'
import Signup from './Screens/Signup/Signup'
import Login from './Screens/Login/Login'
import Profile from './Screens/Profile/Profile'
import DashBoard from './Screens/DashBoard/DashBoard'


const Base_url = process.env.REACT_APP_Axios_Base_urls

function App() {
  return (
    <Box>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/dashBoard' element={<DashBoard />} />
            </Routes>
        </BrowserRouter>
    </Box>
  )
}

export default App