import { Alert, Box, Snackbar, TextField, Button, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import axios  from 'axios'
import { useNavigate } from 'react-router-dom'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';


const Base_url = process.env.REACT_APP_Axios_Base_urls



const Profile = () => {

    const navigate = useNavigate()
    const [inputValues, setInputValues] = useState({
        mobile:"",
        dob:new Date(),
        gender:"",
        age:"",
      })
    
      const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    const date = newValue
    setInputValues({...inputValues,dob:date})
  };
    
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
    
      const genderChangeHandler = (e)  =>{
        if(e.target.value == "male"){
            setInputValues({...inputValues,gender:"male"})
        }else{
            setInputValues({...inputValues,gender:"female"})
        }
      }

      

      const submitHandler = async () => {
        if(inputValues.age == ""){
          setMsg("please Fill Age")
          setColor("warning")
          setOpen(true)
        }else if(inputValues.dobl == ""){
          setMsg("please Fill Date Of Birth")
          setColor("warning")
          setOpen(true)
        }else if(inputValues.gender == ""){
          setMsg("please Fill Gender")
          setColor("warning")
          setOpen(true)
        }else if(inputValues.mobile == ""){
          setMsg("please Fill Mobile Number")
          setColor("warning")
          setOpen(true)
        }else{
          let options = {
            url:`${Base_url}update`,
            method:"POST",
            headers:{
              "content-type":"application/json",
              "Authorization":`Bearer ${localStorage.getItem("tocken")}`
            },
            data:{
              age:inputValues.age,
              gender:inputValues.gender,
              mobile:inputValues.mobile,
              dob:inputValues.dob
            }
          }
    
          try {
            let response = await axios(options)
            if(response.data.message == "update"){
                setMsg("Data Saved SuccessFully")
                setColor("success")
                setOpen(true)
            }else{
                setMsg("unable to update")
                setColor("warning")
                setOpen(true)
            }
            navigate("/dashBoard")
          } catch (error) {
              console.log(error)
          }
    
        }
      }


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
        <Typography>Please Fill Some Additional Information</Typography>
      <TextField id="outlined-basic" label="Age" variant="outlined" onChange={inputChgangeHandler} name="age"  type={"number"}/>
      <FormControl>
  <FormLabel id="demo-radio-buttons-group-label"
    
  >Gender</FormLabel>
  <RadioGroup
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="female"
    name="radio-buttons-group"
    onChange={genderChangeHandler}
  >
    <FormControlLabel value="female" control={<Radio />} label="Female" />
    <FormControlLabel value="male" control={<Radio />} label="Male" />
  </RadioGroup>
</FormControl>
      <MobileDatePicker
          label="Date mobile"
          inputFormat="MM/dd/yyyy"
          value={inputValues.dob}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
          name
        />
        <TextField id="outlined-basic" label="Mobile Number" variant="outlined" onChange={inputChgangeHandler} name="mobile" 
        type={"number"}
        />
      <Button variant="contained" color='primary'
      onClick={submitHandler}
      >Save</Button>
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
    </LocalizationProvider>
   
  )
}

export default Profile