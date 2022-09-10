import { Alert, Box, Button, Snackbar, TextField } from '@mui/material'
import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Base_url = process.env.REACT_APP_Axios_Base_urls



const Signup = () => {

  const navigate = useNavigate()
  const [inputValues, setInputValues] = useState({
    name:"",
    email:"",
    password1:"",
    password2:"",
  })


  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState("")
  const [color, setColor] = useState("success")
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const inputChgangeHandler = (e) => {
    setInputValues({...inputValues,[e.target.name]:e.target.value})
  }


  const submitHandler = async () => {
    if(inputValues.name == ""){
      setMsg("please Fill Name")
      setColor("warning")
      setOpen(true)
    }else if(inputValues.email == ""){
      setMsg("please Fill Email")
      setColor("warning")
      setOpen(true)
    }else if(inputValues.password1 == ""){
      setMsg("please Fill password")
      setColor("warning")
      setOpen(true)
    }else if(inputValues.password2 == ""){
      setMsg("please Fill password")
      setColor("warning")
      setOpen(true)
    }else if(inputValues.password1 != inputValues.password2){
      setMsg("Password Does Not Match")
      setColor("warning")
      setOpen(true)
    }else{
      let options = {
        url:`${Base_url}create`,
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        data:{
          name:inputValues.name,
          email:inputValues.email,
          password:inputValues.password1
        }
      }

      try {
        let response = await axios(options)
        console.log(response)
        if(response.data.message == "User Already Exists"){
          setMsg("User Already Exists")
          setColor("warning")
          setOpen(true)
        }else{
          setMsg("Signup SuccessFull")
          setColor("success")
          setOpen(true)
        }
        navigate("/login")
      } catch (error) {
          console.log(error)
      }

    }
  }

  return (
    <Box>
      <Header />
      <Box
      sx={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        height:"80vh",
        justifyContent:"center",
        rowGap:2
      }}
      >
      <TextField id="outlined-basic" label="Name" variant="outlined" onChange={inputChgangeHandler} name="name"  />
      <TextField id="outlined-basic" label="Email" variant="outlined" onChange={inputChgangeHandler} name="email"/>
      <TextField id="outlined-basic" label="Password" variant="outlined" onChange={inputChgangeHandler} name="password1" type={"password"}/>
      <TextField id="outlined-basic" label="confirm Password" variant="outlined" onChange={inputChgangeHandler} name="password2" type={"password"}/>
      <Button variant="contained" color='primary'
      onClick={submitHandler}
      >Submit</Button>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        // message={msg}
       >
        <Alert onClose={handleClose} severity={color}  sx={{ width: '100%' }}>
      {msg}
  </Alert>
       </Snackbar>
    </Box>
  )
}

export default Signup