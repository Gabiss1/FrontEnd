import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../autenticacao/autenticacao'
import '../css/login.css'
import axiosInstance from "../axios/configuracaoAxios";
import {Link} from 'react-router-dom';

const Login = ()=>{
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [token, setToken] = useState('')
    const {setAuthToken} = useContext(AuthContext)
    const navigate = useNavigate()

    const login = async()=>{
        try{
            const response = await axiosInstance.post('/login', {email, senha})
            setAuthToken(response.data.token)
            setToken(response.data.token)
            navigate('/')
        } catch(error){
            alert('Erro no login'+error.response.data)
        }
    }

    return(
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>
                <div className="input-container">
                    <FontAwesomeIcon icon={faUser} className="input-icon"/>
                    <input
                        type="email"
                        placeholder="E-mail do usuário"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <br></br>
                <div className="input-container">
                    <FontAwesomeIcon icon={faLock} className="input-icon"/>
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e)=>setSenha(e.target.value)}
                    />
                </div>
                <br></br>
                <a href="#" className="link">Esqueceu a senha?</a>
                <div className="button-container">
                    <button onClick={login} className="button">Login</button>
                </div>
                <br></br>
                <Link to='/cadastro'>Acessar Cadastro</Link>
            </div>
        </div>
    )
}

export default Login