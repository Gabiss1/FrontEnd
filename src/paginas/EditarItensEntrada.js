import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import Header from '../Header';
import BotaoVoltar from '../componentes/BotaoVoltar';
import axiosInstance from '../axios/configuracaoAxios';

function EditarItensEntrada() {

  const { id } = useParams();
  const navigate = useNavigate();

  //cria novo estado para os campos da tela
  const [campos, setCampos] = useState({
    numeroNota: 0,
    codigoPeca: '',
    quantidadePeca: 0,
    precoPeca: 0,
    lote: ''
  });




  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState('');

  const [erros, setErros] = useState({});

  useEffect(() => {
    axiosInstance.get(`/itensentrada/${id}`)
      .then(response => {
        setCampos(response.data);
        setLoading(false);
      })
      .catch(error => {
        setMensagem('Houve um problema ao buscar o registro.');
        setLoading(false);
      });
  }, [id]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setCampos(prevCampos => ({
      ...prevCampos,
      [name]: value
    }));
  }
  function validarCampos() {
    const novosErros = {};

    if (!campos.numeroNota) {
        novosErros.numeroNota = 'nota  é obrigatório';
    }

    if (!campos.codigoPeca) {
        novosErros.codigoPeca = 'codigo da peca é obrigatório';
    }

    if (!campos.quantidadePeca) {
        novosErros.quantidadePeca = 'quantidade de pecas  é obrigatório';
    }

    if (!campos.precoPeca) {
        novosErros.precoPeca = 'preco  da peca é obrigatório';
    }

    if (!campos.lote) {
        novosErros.lote = 'lote da peca é obrigatório';
    }
    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarCampos()) {
      return;
    }

    axiosInstance.put(`/editaritensentrada/${id}`, campos)
      .then(response => {
        setMensagem('Dados editados com sucesso!');

        // Limpar mensagem após 3 segundos
        setTimeout(() => {
          setMensagem('');
          navigate(-1);
        }, 3000);


      })
      .catch(error => {
        setMensagem('Houve um problema ao atualizar o registro.');
      });
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <Header title="Editar Itens Entrada" />

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>
              <h2>Dados da peça</h2>
            </legend>

            <div className="inline-fields">
                            <div className="field-maior">
                                <label>Nota de Entrada:
                                    <input type="text" name="numeroNota" id="notaentrada" value={campos.notaEntrada} onChange={handleInputChange} />
                                    {erros.notaEntrada && <p className="error">{erros.notaEntrada}</p>}
                                </label>
                            </div>
                        </div>    

                        <div className="inline-fields">
                            <div className="field-maior">
                                <label>Código da Peça:
                                    <input type="text" name="codigoPeca" id="codigopeca" value={campos.codigoPeca} onChange={handleInputChange} />
                                    {erros.codigoPeca && <p className="error">{erros.codigoPeca}</p>}
                                </label>
                            </div>
                        </div>

                        <div className="inline-fields">
                            <div className="field-maior">
                                <label>Quantidade de Pecas:
                                    <input type="number" step="0.01" name="quantidadePeca" id="quantidadepeca" value={campos.quantidadePeca} onChange={handleInputChange} />
                                    {erros.quantidadePeca && <p className="error">{erros.quantidadePeca}</p>}
                                </label>
                            </div>
                        </div>

                        <div className="inline-fields">
                            <div className="field-maior">
                                <label>Preço Peça:
                                    <input type="number" step="0.01" name="precoPeca" id="precopeca" value={campos.precoPeca} onChange={handleInputChange} />
                                    {erros.precoPeca && <p className="error">{erros.precoPeca}</p>}
                                </label>
                            </div>
                        </div>

                        <div className='inline-filds'>
                            <div className='field-maior'>
                                <label>Lote:
                                    <input type='text' name='lote' id='lote' value={campos.lote} onChange={handleInputChange} />
                                    {erros.lote && <p className='erro'>{erros.lote}</p>}
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
  );
}


export default EditarItensEntrada;