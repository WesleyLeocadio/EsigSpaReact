import React, { useEffect, useState } from 'react';
import imageEsig from '../../assets/esig.png';
import './styles.css';
import api from '../../services/api';
import { FiPower, FiTrash2 } from 'react-icons/fi';



function Principal() {
    const [registros, setRegistros] = useState([]);

    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState(false);


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
            alert('Erro ao deletar caso, tente novamente.');
        }
    }




    return (
        <div className="profile-container">
            <section className="form">

                <div class="back">
                <img src={imageEsig} alt="Be The Hero" />
                </div>
                <form onSubmit={handleRegister} >
                    <input
                        placeholder="Descrição"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />
                    <button className="button" type="submit">Inserir</button>

                </form>
                <h1>Casos cadastrados</h1>
                <ul>
                    {registros.map(registro => (
                        <li key={registro.id}>
                            <strong>Descrição:</strong>
                            <p>{registro.descricao}</p>

                            <strong>Status:</strong>
                            <p>{registro.status}</p>

                            <button onClick={() => handleDeleteIncident(registro.id)} type="button">
                                <FiTrash2 size={20} color="#a8a8b3" />

                            </button>

                        </li>
                    ))}
                </ul>

            </section>



        </div>

    );
}

export default Principal;
