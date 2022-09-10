import { Box, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'


const Base_url = process.env.REACT_APP_Axios_Base_urls


const DashBoard = () => {

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        mobile: "",
        age: "",
        gender: "",
        dob: ""
    })


    const fetchdata = async () => {
        let options = {
            url: `${Base_url}userData`,
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("tocken")}`
            },
        }


        let response = await axios(options)
        console.log(response)
        if (response.data.message == "success") {
            setUserData({ ...userData, ...response.data.user })
        }

    }


    useEffect(() => {
        fetchdata()
    }, [])


    return (
        <Box>
            <Header />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "80vh",
                    rowGap: 3
                }}
            >
                <Typography fontSize={"23px"}>Name - {userData.name}</Typography>
                <Typography fontSize={"23px"}>Email - {userData.email}</Typography>
                <Typography fontSize={"23px"}>Age - {userData.age}</Typography>
                <Typography fontSize={"23px"}>Mobile Number - {userData.mobile}</Typography>
                <Typography fontSize={"23px"}>Gender - {userData.gender}</Typography>
                <Typography fontSize={"23px"}>Date Of Birth - {userData.dob == "" ? null : userData.dob.substr(0, 10)}</Typography>
            </Box>
        </Box>
    )
}

export default DashBoard