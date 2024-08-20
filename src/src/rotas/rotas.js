import React from "react";
import ReactDOM from "react-dom";
import { Route, Routes, BrowserRouter} from 'react-router-dom'
import Home from '../paginas/Home'
import Cadastro from "../paginas/Cadastro";
import ListarRegistros from "../paginas/ListarRegistros";
import EditarRegistro from "../paginas/EditarRegistro";
import Upload from "../componentes/Upload";
import PrivateRoute from '../autenticacao/rotasPrivadas';
import Login from '../paginas/Login';
import AuthProvider from "../autenticacao/autenticacao";

function Rotas() {
    return (
        <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/cadastro" element={<Cadastro/>}/>
                <Route path="/login" element={<Login/>}/>

                <Route path="/" element={<PrivateRoute/>}>
                    <Route path="/" element={<Home/>}/>
                </Route>
                <Route path="/listar" element={<PrivateRoute/>}>
                    <Route path="/listar" element={<ListarRegistros/>}/>
                </Route>
                <Route path="/editar/:id" element={<PrivateRoute/>}>
                    <Route path="/editar/:id" element={<EditarRegistro/>}/>
                </Route>
                <Route path="/upload" element={<PrivateRoute/>}>
                    <Route path="/upload" element={<Upload/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
        </AuthProvider>
    )
}

export default Rotas