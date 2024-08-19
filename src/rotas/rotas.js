import React from "react";
import ReactDOM from "react-dom";
import { Route, Routes, BrowserRouter} from 'react-router-dom'
import Home from '../paginas/Home'
import CadastroFornecedor from "../paginas/CadastroFornecedor";
import NotaEntrada from "../paginas/NotaEntrada";
import ItensEntrada from "../paginas/ItensEntrada";
import AuthProvider from "../autenticacao/autenticacao";
import Login from "../paginas/Login";
import Cadastro from "../paginas/Cadastro"
import PrivateRoute from "../autenticacao/rotasPrivadas";

function Rotas() {
    return (
        <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/cadastro" element={<Cadastro/>}/>

                <Route path="/cadastrofornecedor" element={<PrivateRoute/>}>
                    <Route path="/cadastrofornecedor" element={<CadastroFornecedor/>}/>
                </Route>
                <Route path="/entrada" element={<PrivateRoute/>}>
                    <Route path="/entrada" element={<NotaEntrada/>}/>
                </Route>
                <Route path="/itensentrada" element={<PrivateRoute/>}>
                    <Route path="/itensentrada" element={<ItensEntrada/>}/>
                </Route>
                <Route path="/" element={<PrivateRoute/>}>
                    <Route path="/" element={<Home/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
        </AuthProvider> 
        // <BrowserRouter>
        //     <Routes>

        //             <Route path="/cadastro" element={<CadastroFornecedor/>}/>

  
        //             <Route path="/entrada" element={<NotaEntrada/>}/>
     
        //             <Route path="/itensentrada" element={<ItensEntrada/>}/>
        
 
        //             <Route path="/" element={<Home/>}/>
 
        //     </Routes>
        // </BrowserRouter>
    
    )
}

export default Rotas

{/* <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>

                <Route path="/cadastro" element={<PrivateRoute/>}>
                    <Route path="/cadastro" element={<CadastroFornecedor/>}/>
                </Route>
                <Route path="/entrada" element={<PrivateRoute/>}>
                    <Route path="/entrada" element={<NotaEntrada/>}/>
                </Route>
                <Route path="/itensentrada" element={<PrivateRoute/>}>
                    <Route path="/itensentrada" element={<ItensEntrada/>}/>
                </Route>
                <Route path="/" element={<PrivateRoute/>}>
                    <Route path="/" element={<Home/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
        </AuthProvider> */}