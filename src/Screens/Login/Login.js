import { Alert, Box, Button, Snackbar, TextField } from '@mui/material'
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
import axios from "axios"


const Base_url = process.env.REACT_APP_Axios_Base_urls




const Login = () => {

    
  const navigate = useNavigate()
  const [inputValues, setInputValues] = useState({
    email:"",
    password:"",
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
     if(inputValues.email == ""){
      setMsg("please Fill Email")
      setColor("warning")
      setOpen(true)
    }else if(inputValues.password == ""){
      setMsg("please Fill password")
      setColor("warning")
      setOpen(true)
    }else{
      let options = {
        url:`${Base_url}login`,
        method:"POST",
        headers:{
          "content-type":"application/json"
        },
        data:{
          email:inputValues.email,
          password:inputValues.password
        }
      }

      try {
        let response = await axios(options)
        console.log(response)
        if(response.data.message == "Login SuccessFull"){
          setMsg("Login SuccessFull")
          setColor("success")
          setOpen(true)
          localStorage.setItem("tocken",response.data.tocken)
          navigate("/profile")
        }else if(response.data.message == "Incorrect Password"){
          setMsg("Incorrect Password")
          setColor("warning")
          setOpen(true)
        }else{
            setMsg("User Not Found")
            setColor("warning")
            setOpen(true)
            navigate("/")
        }
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
      <TextField id="outlined-basic" label="Email" variant="outlined" onChange={inputChgangeHandler} name="email"/>
      <TextField id="outlined-basic" label="Password" variant="outlined" onChange={inputChgangeHandler} name="password" type={"password"}/>
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

export default Login
