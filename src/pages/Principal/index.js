import React, { useEffect, useState } from 'react';
import imageEsig from '../../assets/esigapresentacao.png';
import imageAberta from '../../assets/aberto_icon.png';
import imageFechada from '../../assets/ok_circle_icon.png';

import './styles.css';
import api from '../../services/api';
import { FiEdit,FiCheckCircle,FiCircle, FiTrash2 } from 'react-icons/fi';



function Principal() {
    const [registros, setRegistros] = useState([]);

    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState(false);


    function atualizarBanco(){
        api.get('registro').then(response => {
            setRegistros(response.data);
        })
    }
    
    useEffect(() => {
        api.get('registro').then(response => {
            setRegistros(response.data);
        })
    }, []);

    async function handleRegister(e) {
        e.preventDefault();
        const data = {
            descricao,
            status,

        };
        try {
            const response = await api.post('registro', data);
            alert('Registro adicionado');
            atualizarBanco();

        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }


    async function handleDeleteIncident(id) {
        try {
            await api.delete(`registro/${id}`);
            setRegistros(registros.filter(registro => registro.id !== id));
            alert(`Registro ${id} excluído!`);

        } catch (err) {
            alert('Erro ao deletar registro, tente novamente.');
        }
    }

    async function handleUpdateIncident(id) {
        try {
            await api.put(`registro/${id}`);
            alert(`Registro ${id} atualizado!`);
            atualizarBanco();

        } catch (err) {
            alert('Erro ao atualizar registro, tente novamente.');
        }
    }


    async function deleteAllStatusCompleted() {
        try {
            await api.delete(`registro`);
            alert(`Registros concluídos excluídos! `);
            atualizarBanco();

        } catch (err) {
            alert('Erro ao atualizar registro, tente novamente.');
        }
    }

    async function handlefindAllByStatus(b) {
        try {
            await api.get(`registro/${b}`).then(response => {
                setRegistros(response.data);
            })      

        } catch (err) {
            alert('Erro ao atualizar registro, tente novamente.');
        }
    }

    

    return (
        <div className="profile-container">
            
            <img className="image" src={imageEsig} alt="Be The Hero" />
            <section className="form">


                <form onSubmit={handleRegister} >
                    <input
                        placeholder="Descrição"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />
                    <button className="button" type="submit">Inserir</button>

                </form>
                <div className="grupobotoes">
                    <button className="button" onClick={() => atualizarBanco()}  id ="all" type="submit">All</button>
                    <button className="button" onClick={() => handlefindAllByStatus(false)} id ="allactive" type="submit">Active</button>
                    <button className="button" onClick={() => handlefindAllByStatus(true)} id ="allcompleted"type="submit">Completed</button>
                    <button className="button" onClick={() => deleteAllStatusCompleted()}  id ="Allclear"type="submit">completed</button>

                </div>
                <h1>Casos cadastrados</h1>

                <ul>
                    {registros.map(registro => (
                        <li key={registro.id}>
                            <strong>Descrição:</strong>
                            <p>{registro.descricao}</p>

                    

                            <button onClick={() => handleDeleteIncident(registro.id)} type="button">
                                <FiTrash2 size={20} color="#a8a8b3" />

                            </button>
                            <button id="update" onClick={() => handleUpdateIncident(registro.id)} type="button">
                                <FiEdit size={20} color="#a8a8b3" />

                            </button>

                        </li>
                    ))}
                </ul>

            </section>



        </div>

    );
}

export default Principal;
