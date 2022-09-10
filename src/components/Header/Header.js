import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate()

  return (
    <Box 
    sx={{
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-end",
        columnGap:3,
        backgroundColor:"black",
        height:"8vh",
        alignItems:"center",
        margin:"0px",
        padding:"10px"
    }}
    >
        <Button variant="contained" color='primary' onClick={()=>navigate
        ("/")} 
        sx={{
            display:localStorage.getItem("tocken") !== null ? "none" : "flex"
        }}
        >Signup</Button>
        <Button variant="contained" color='warning' onClick={()=>navigate
        ("/login")} 
        sx={{
            display:localStorage.getItem("tocken") !== null ? "none" : "flex"
        }}
        >Login</Button>
        <Button variant="contained" color='primary' onClick={()=>navigate
        ("/profile")} 
        sx={{
            display:localStorage.getItem("tocken") == null ? "none" : "flex"
        }}
        >Profile</Button>
        <Button variant="contained" color='primary' onClick={()=>navigate
        ("/dashBoard")} 
        sx={{
            display:localStorage.getItem("tocken") == null ? "none" : "flex"
        }}
        >DashBoard</Button>
        <Button variant="contained" color='warning' onClick={()=>{
            localStorage.removeItem("tocken")
            navigate("/login")
        }} 
        sx={{
            display:localStorage.getItem("tocken") == null ? "none" : "flex"
        }}
        >Logout</Button>

    </Box>
    )
}

export default Header