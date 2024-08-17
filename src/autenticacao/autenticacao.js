import React, { createContext, useState, useEffect} from "react";
import axiosInstance from "../axios/configuracaoAxios";
export const AuthContext = createContext()

const verificarTokenServidor = async(token)=>{
    try{
        const response = await axiosInstance.post('/validaToken', {token})
        return response.data.valid
    } catch(error){
        return false
    }
}

const AuthProvider = ({children})=>{
    const [authToken, setAuthToken] = useState('')

    useEffect(()=>{
        const checkToken = async ()=>{
            const token = localStorage.getItem('token')
            console.log('Token', token)
            if (token) {
                const isValid = await verificarTokenServidor(token)
                if (isValid) {
                    console.log('Token Válido')
                    setAuthToken(token)
                } else {
                    console.log('Remove token')
                    localStorage.removeItem('token')
                }
            }   
        }
        checkToken()
    }, [])

    useEffect(()=>{
        if (authToken) {
            console.log('Seta o token ', authToken)
            localStorage.setItem('@Auth:token', authToken)
        } else {
            console.log('Remove o Token authToken', authToken)
            localStorage.removeItem('@Auth:token', authToken)
        }
    }, [authToken])

    return(
        <AuthContext.Provider value={{authToken, setAuthToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider