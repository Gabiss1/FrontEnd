import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BotaoVoltar from '../componentes/BotaoVoltar';
import { Link } from 'react-router-dom';

import '../App.css';
import axiosInstance from '../axios/configuracaoAxios';

//Importar o modal
import Modal from '../componentes/Modal';


 // Importando o ícone de edicao
import { FaEdit,FaTrash  } from 'react-icons/fa'; 


function ListarEntradas() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [selectedNota, setSelectedNota] = useState(null);

  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    axiosInstance.get('/listarentradas')
      .then(response => {
        setRegistros(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Houve um problema ao buscar os registros.');
        setLoading(false);
      });
  }, []);


  const handleDelete = (numeroNota) => {
    setSelectedNota(numeroNota);
    setShowModal(true);
  };


  const confirmDelete = () => {
    axiosInstance.delete(`/deletarEntrada/${selectedNota}`)
      .then(response => {
        setRegistros(registros.filter(registro => registro.numeroNota !== selectedNota));
        setMensagem('Registro deletado com sucesso!');
        setShowModal(false);
      })
      .catch(error => {
        setError('Houve um problema ao deletar o registro.');
        setShowModal(false);
      });

        // Limpar mensagem após 3 segundos
        setTimeout(() => {
          setMensagem('');
      }, 3000);

  };


  const closeModal = () => {
    setShowModal(false);
    setSelectedNota(null);
  };


  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="listar-registros">
      <h2>Lista de Peças</h2>
      <table>
        <thead>
          <tr>
            <th>Número da Nota</th>
            <th>Fornecedor</th>
          </tr>
        </thead>
        <tbody>
          {registros.map(registro => (
            <tr key={registro.numeroNota}>
              <td>{registro.numeroNota}</td>
              <td>{registro.fornecedorId}</td>
              <td class="action-column">
                <Link to={`/editarentrada/${registro.numeroNota}`} className="espaco_coluna">
                   <FaEdit/> Editar  {/* Ícone de edição */}
                </Link>
                
                <Link onClick={() => handleDelete(registro.numeroNota)} >
                  <FaTrash /> Deletar {/* Ícone de delete */}
                </Link>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
      <BotaoVoltar/>
      <Modal
        show={showModal}
        handleClose={closeModal}
        handleConfirm={confirmDelete}
        title="Confirmar Exclusão"
      >
        Tem certeza que deseja deletar a peça?
      </Modal>
      </div>
  );
}
export default ListarEntradas;