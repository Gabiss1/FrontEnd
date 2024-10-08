import React, {useState, useEffect} from 'react'
import BotaoVoltar from '../componentes/BotaoVoltar'
import { Link } from 'react-router-dom'
import '../App.css'
import { FaEdit, FaTrash} from 'react-icons/fa'
import Modal from '../componentes/Modal'
import axiosInstance from '../axios/configuracaoAxios'

function ListarRegistros() {
    const [registros, setRegistros] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedId, setSelectedId] = useState(null)
    const [mensagem, setMensagem] = useState('')

    useEffect(()=>{
        axiosInstance.get('/usuarios')
        .then(response=>{
            setRegistros(response.data)
            setLoading(false)
        }).catch(error=>{
            setError('Houve um problema ao Listar os registros')
            console.log()
            setLoading(false)
        })
    }, [])
    const handleDelete = (id)=>{
        setSelectedId(id)
        setShowModal(true)
    }

    const confirmDelete = ()=>{
        axiosInstance.delete(`/usuarios/${selectedId}`)
        .then(response=>{
            setRegistros(registros.filter(registro => registro.id !== selectedId))
            setMensagem('Registro deletado com sucesso!')
            setShowModal(false)
        }).catch(error =>{
            setError('Houve um problema ao deletar o registro!')
            setShowModal(false)
        })

        setTimeout(() => {
            setMensagem('')
        }, 3000);
    }

    const closeModal = ()=>{
        setShowModal(false)
        setSelectedId(null)
    }

    if(loading){
        return <p>Carregando...</p>
    } if(error){
        return <p>{error}</p>
    } return(
        <div className='listar-registros'>
            <h2>Lista de Registros</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Cidade</th>
                        <th>UF</th>
                        <th>CEP</th>
                        <th>Complemento</th>
                        <th>Bairro</th>
                        <th>Número</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {registros.map(registro =>(
                        <tr key={registro.id}>
                            <td>{registro.nome}</td>
                            <td>{registro.idade}</td>
                            <td>{registro.cidade}</td>
                            <td>{registro.uf}</td>
                            <td>{registro.cep}</td>
                            <td>{registro.complemento}</td>
                            <td>{registro.bairro}</td>
                            <td>{registro.numero}</td>
                            <td class='action-column'>
                                <Link to={`/editar/${registro.id}`} className='espaco_coluna'>
                                    <FaEdit/> Editar {/* Ícone de edição*/}
                                </Link>
                                <Link onClick={()=>handleDelete(registro.id)}>
                                    <FaTrash/> Deletar {/* Ícone de delete */}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <BotaoVoltar/>
            <Modal
                show= {showModal}
                handleClose = {closeModal}
                handleConfirm= {confirmDelete}
                title = 'Confirmar Exclusão'
            >
                Tem certeza que deseja deletar este registro?
            </Modal>
        </div>
    )
}

export default ListarRegistros