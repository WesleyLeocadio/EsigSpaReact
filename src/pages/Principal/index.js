import React, { useEffect, useState } from 'react';
import imageEsig from '../../assets/esigapresentacao.png';

import './styles.css';
import api from '../../services/api';
import { FiEdit,FiCheckCircle,FiCircle, FiTrash2 } from 'react-icons/fi';



function Principal() {
    const [registros, setRegistros] = useState([]);

    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState(false);


    function atualizarBanco() {
        api.get('registro').then(response => {
            setRegistros(response.data);
        })
        document.getElementById("texto").innerHTML = "Todos";

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
            atualizarBanco();

        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
        setDescricao("");

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
        document.getElementById("texto").innerHTML = "Todos";

    }

    async function handlefindAllByStatus(b) {
        let text = "Lista de registros Ativos";
        if (b) {
            text = "Lista de registros Concluídos";
        }

        document.getElementById("texto").innerHTML = text;
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
                    <input id="input"
                        placeholder="Descrição"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />
                    <button className="button" type="submit">Inserir</button>

                </form>
                <div className="grupobotoes">
                    <button className="button" onClick={() => atualizarBanco()} id="all" type="submit">Todos</button>
                    <button className="button" onClick={() => handlefindAllByStatus(false)} id="allactive" type="submit">Ativos</button>
                    <button className="button" onClick={() => handlefindAllByStatus(true)} id="allcompleted" type="submit">Concluídos</button>
                    <button id="btnExcluir"className="button" onClick={() => deleteAllStatusCompleted()} id="Allclear" type="submit">Excluir concluídos</button>

                </div>
                <h1 id="texto">Casos cadastrados</h1>

                <ul>
                    {registros.map(registro => (
                        <li key={registro.id}>
                            <strong>Descrição:</strong>
                            <p>{registro.descricao}</p>
                            {registro.status ? <FiCheckCircle size={20}/> : <FiCircle size={20}/>}
                            <button onClick={() => handleDeleteIncident(registro.id)} type="button">
                                <FiTrash2 size={20}  />

                            </button>
                            <button id="update" onClick={() => handleUpdateIncident(registro.id)} type="button">
                                <FiEdit size={20}  />

                            </button>

                        </li>
                    ))}
                </ul>

            </section>



        </div>

    );
}

export default Principal;
