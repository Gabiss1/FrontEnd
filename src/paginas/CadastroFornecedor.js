
import Header from '../Header';

import '../App.css';

import BotaoVoltar from '../componentes/BotaoVoltar';

//Utilizada para auxiliar no controle de outras funcoes da aplicacao
import React, { useState, useEffect } from 'react';

import axiosInstance from '../axios/configuracaoAxios';


function CadastroFornecedor() {

    //cria novo estado para os campos da tela
    const [campos, setCampos] = useState({
        nomeEmpresa: '',
        email: '',
        contato: ''
    });

    const [mensagem, setMensagem] = useState('');

    const [erros, setErros] = useState({});

    function handleInputChange(event) {
        const { name, value } = event.target;
        setCampos(prevCampos => ({
            ...prevCampos,
            [name]: value
        }));

        setErros(prevErros => ({
            ...prevErros,
            [name]: ''
        }));
    }

    function validarCampos() {
        const novosErros = {};

        if (!campos.nomeEmpresa) {
            novosErros.nomeEmpresa = 'Nome é obrigatório';
        }

        if (!campos.email) {
            novosErros.email = 'E-mail é obrigatório';
        }

        if (!campos.contato) {
            novosErros.contato = 'contato é obrigatório';
        }

        setErros(novosErros);

        return Object.keys(novosErros).length === 0;
    }

    function handleFormSubmit(event) {

        event.preventDefault();

        if (!validarCampos()) {
            return;
        }

        console.log('Submetendo:', campos);

        axiosInstance.post('/fornecedor', campos)
            .then(response => {
                setMensagem('Formulário enviado com sucesso!');
                console.log(response.data);

                // Limpar os campos do formulário após o envio
                setCampos({
                    nomeEmpresa: '',
                    email: '',
                    contato: ''
                });

                // Limpar mensagem após 3 segundos
                setTimeout(() => {
                    setMensagem('');
                }, 3000);
            })
            .catch(error => {
                console.error('Houve um erro ao enviar o formulário:', error);
                setMensagem('Erro ao enviar o formulário. Tente novamente.');
            });
    }

    return (
        <div className="App">
            <Header title="Formulario de Cadastro" />

            <div className="form-container">
                <form onSubmit={handleFormSubmit}>
                    <fieldset>
                        <legend>
                            <h2>Dados de Cadastro</h2>
                        </legend>

                        <div className="inline-fields">
                            <div className="field-maior">
                                <label>Nome da Empresa:
                                    <input type="text" name="nomeEmpresa" id="nomeempresa" value={campos.nomeEmpresa} onChange={handleInputChange} />
                                    {erros.nomeEmpresa && <p className="error">{erros.nomeEmpresa}</p>}
                                </label>
                            </div>
                        </div>    

                        <div className="inline-fields">
                            <div className="field-maior">
                                <label>E-mail:
                                    <input type="text" name="email" id="nomemaile" value={campos.email} onChange={handleInputChange} />
                                    {erros.email && <p className="error">{erros.email}</p>}
                                </label>
                            </div>

                            <div className="field-menor">
                                <label>contato:
                                    <input type="number"  name="contato" id="contato" value={campos.contato} onChange={handleInputChange} />
                                    {erros.contato && <p className="error">{erros.contato}</p>}
                                </label>
                            </div>
                        </div>

                        <input type="submit" value="Salvar" />
                    </fieldset>
                </form>
                {mensagem && <p>{mensagem}</p>}
                <BotaoVoltar></BotaoVoltar>
            </div>
        </div>
    )
}

export default CadastroFornecedor;