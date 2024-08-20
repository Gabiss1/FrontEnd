import React, {useState, useEffect, useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {AuthContext} from './autenticacao';
import axiosInstance from '../axios/configuracaoAxios';


const PrivateRoute = ()=>{
    const {authToken} = useContext(AuthContext)
    const [isValid, setIsValid] = useState(null)

    const verifyToken = async()=>{
        try{
            const response = await axiosInstance.post('/validarToken', {token: authToken})
            setIsValid(response.data.valid)
        } catch{
            localStorage.removeItem('token')
            setIsValid(false)
        }
    }

    verifyToken()

    useEffect(()=>{
        if (authToken) {
            console.log('Token válido')
        } else{
            console.log('PrivateRoute remove o token authToken', authToken)
            localStorage.removeItem('token')
            setIsValid(false)
        }
    }, [authToken])

    if (isValid === null) {
        return <div>Loading...</div>
    }

    return isValid ? <Outlet/>: <Navigate to="/login"/>
}

export default PrivateRoute