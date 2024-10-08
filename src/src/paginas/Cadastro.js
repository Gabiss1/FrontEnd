import Header from "../Header";
import '../App.css';
import BotaoVoltar from "../componentes/BotaoVoltar";
import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../axios/configuracaoAxios";

function Cadastro() {

    const [estados, setEstados] = useState([])

    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                setEstados(response.data)
            })
    }, [])

    const [campos, setCampos] = useState({
        nome: "",
        idade: 0,
        cidade: "",
        uf: "",
        cep: '',
        complemento: '',
        bairro: '',
        numero: 0,
        email: '',
        senha: '',
        confirmarsenha: ''
    })

    const [mensagem, setMensagem] = useState('')
    const [erros, setErros] = useState({})

    function handleInputChange(event) {
        const { name, value } = event.target;
        setCampos(prevCampos => ({
            ...prevCampos,
            [name]: value
        }));
    }

    function validarCampos() {
        const novosErros = {};

        if (!campos.nome) {
            novosErros.nome = 'Nome é obrigatório';
        }

        if (!campos.idade || campos.idade <= 0) {
            novosErros.idade = 'Idade deve ser um número positivo';
        }

        if (!campos.cidade) {
            novosErros.cidade = 'Cidade é obrigatória';
        }

        if (!campos.uf || campos.uf <= 0) {
            novosErros.uf = 'UF é obrigatório';
        }

        if (!campos.bairro) {
            novosErros.bairro = 'Bairro é obrigatório';
        }

        if (!campos.numero) {
            novosErros.numero = 'Número é obrigatório';
        }

        if (!campos.logradouro) {
            novosErros.logradouro = 'Logradouro é obrigatório';
        }

        if (!campos.cep) {
            novosErros.cep = 'CEP é obrigatório';
        } else if (campos.cep.replace(/\D/g, '').length !== 8) {
            novosErros.cep = 'CEP deve ter 8 dígitos';
        }

        if (!campos.confirmarsenha) {
            novosErros.confirmarsenha = 'Confirmar Senha é obrigatória';
        }else if (campos.confirmarsenha!==campos.senha) {
                novosErros.senha = 'Senha e confirmar senha devem ser iguais!'
            }

        if (!campos.senha) {
            novosErros.senha = 'Senha é obrigatório';
        }

        setErros(novosErros);

        return Object.keys(novosErros).length === 0;
    }

    function validaConfirmacaoSenha() {
        const novosErros = {}
        if (!campos.confirmarsenha) {
            novosErros.confirmarsenha = 'Confirmar senha é obrigatório'
        } else if(campos.confirmarsenha!==campos.senha){
            novosErros.confirmarsenha = 'Senha e Confirmar Senha devem ser iguais'
        }
        setErros(novosErros)
    }

    function handleFormSubmit(event) {
        event.preventDefault()

        if (!validarCampos()) {
            return;
        }

        console.log(campos)
        axiosInstance.post('/usuarios', campos)
            .then(response => {
                setMensagem('Formulário Enviado com sucesso!')
                console.log(response.data)

                setCampos({
                    nome: '',
                    idade: 0,
                    cidade: '',
                    uf: '',
                    cep: '',
                    complemento: '',
                    bairro: '',
                    numero: 0,
                    email: '',
                    senha: '',
                    confirmarsenha: ''
                });
                setTimeout(() => {
                    setMensagem('')
                }, 3000);
            })/*.catch(error => {
                console.error('Houve um erro ao enviar o formulário:', error);
                setMensagem('Erro ao enviar o formulário. Tente novamente.');
            })*/
    }

    function buscarEnderecoPorCEP() {
        const cep = campos.cep.replace(/\D/g, '');
        if (cep.length === 8) {
            axios.get(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => {
                    if (response.data.erro) {
                        setErros(prevErros => ({ ...prevErros, cep: 'CEP inválido' }));
                    } else {
                        setCampos(prevCampos => ({
                            ...prevCampos,
                            cidade: response.data.localidade,
                            complemento: response.data.complemento,
                            uf: response.data.uf,
                            bairro: response.data.bairro,
                            logradouro: response.data.logradouro

                        }));
                    }
                })
                .catch(error => {
                    setErros(prevErros => ({ ...prevErros, cep: 'Erro ao buscar CEP' }));
                });
        }
    }


    return (
        <div className="App">
            <Header title='Formulário de Cadastro' />
            <div className="form-container">
                <form onSubmit={handleFormSubmit}>
                    <fieldset>
                        <legend>
                            <h2>Dados de Cadastro</h2>
                        </legend>

                        <div>
                            <label>Nome:
                                <input type="text" name="nome" id="nome" value={campos.nome} onChange={handleInputChange} />
                                {erros.nome && <p className="error">{erros.nome}</p>}
                            </label>
                        </div>
                        <div>
                            <label>Idade:
                                <input type="number" name="idade" id="idade" value={campos.idade} onChange={handleInputChange} />
                                {erros.idade && <p className="error">{erros.idade}</p>}
                            </label>
                        </div>
                        <div>
                            <label>Cidade:
                                <input type="text" name="cidade" id="cidade" value={campos.cidade} onChange={handleInputChange} />
                                {erros.cidade && <p className="error">{erros.cidade}</p>}
                            </label>
                        </div>
                        <div className="inline-fields">
                            <div className="field-menor">
                                <label>CEP:
                                    <input type="text" name="cep" id="cep" value={campos.cep} onChange={handleInputChange} onBlur={buscarEnderecoPorCEP} />
                                    {erros.cep && <p className="error">{erros.cep}</p>}
                                </label>
                            </div>

                            <div className="field-maior">
                                <label>Cidade:
                                    <input type="text" name="cidade" id="cidade" value={campos.cidade} onChange={handleInputChange} />
                                    {erros.cidade && <p className="error">{erros.cidade}</p>}
                                </label>
                            </div>
                        </div>

                        <div className="inline-fields">
                            <div className="field-maior">
                                <label>Bairro:
                                    <input type="text" name="bairro" id="cidabairrode" value={campos.bairro} onChange={handleInputChange} />
                                    {erros.bairro && <p className="error">{erros.bairro}</p>}
                                </label>
                            </div>

                            <div className="field-menor">
                                <label>Complemento:
                                    <input type="text" name="complemento" id="complemento" value={campos.complemento} onChange={handleInputChange} />
                                    {erros.complemento && <p className="error">{erros.complemento}</p>}
                                </label>
                            </div>
                        </div>

                        <div className="inline-fields">
                            <div className="field-maior">
                                <label>Logradouro:
                                    <input type="text" name="logradouro" id="logradouro" value={campos.logradouro} onChange={handleInputChange} />
                                    {erros.logradouro && <p className="error">{erros.logradouro}</p>}
                                </label>
                            </div>

                            <div className="field-menor">
                                <label>Número:
                                    <input type="number" name="numero" id="numero" value={campos.numero} onChange={handleInputChange} />
                                    {erros.numero && <p className="error">{erros.numero}</p>}
                                </label>
                            </div>
                        </div>

                        <div>
                            <label>UF:
                                <select name="uf" id="uf" value={campos.uf} onChange={handleInputChange}>
                                    <option value='0'>Selecione uma Opção</option>
                                    {estados.map(estado => (<option key={estado.sigla} value={estado.sigla}>{estado.sigla}</option>))}
                                </select>
                            </label>
                            <label>
                                <div>
                                    {erros.uf && <p className="error">{erros.uf}</p>}
                                </div>
                            </label>
                        </div>
                        <div className="inline-fields">
                            <div className="field-maior">
                                <label>E-mail:
                                    <input type="text" name="email" id="nomemaile" value={campos.email} onChange={handleInputChange} />
                                    {erros.email && <p className="error">{erros.email}</p>}
                                </label>
                            </div>

                            <div className="field-menor">
                                <label>Senha:
                                    <input type="password" name="senha" id="senha" value={campos.senha} onChange={handleInputChange} />
                                    {erros.senha && <p className="error">{erros.senha}</p>}
                                </label>
                            </div>
                            <div className="field-menor">
                                <label>Confirmar Senha:
                                    <input type="text" name="confirmarsenha" id="confirmarsenha" value={campos.confirmarsenha} onChange={handleInputChange} onBlur={validaConfirmacaoSenha}/>
                                    {erros.confirmarsenha && <p className="error">{erros.confirmarsenha}</p>}
                                </label>
                            </div>
                        </div>
                        <input type="submit" value="salvar" />
                    </fieldset>
                </form>
                {mensagem && <p>{mensagem}</p>}
                <BotaoVoltar></BotaoVoltar>
            </div>
        </div>
    )
}

export default Cadastro