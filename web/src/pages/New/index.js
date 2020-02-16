import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './style.css';

export default function New({ history }) {
    const [thumbnail, setThumbnail] = useState(null);
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

    async function handleSubmit(event) {
        event.preventDefault();

        const user_id = localStorage.getItem('user');
        const data = new FormData();
        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_id }
        });

        history.push('/dashboard');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'hasthumbnail' : ''}
            >
                <input type="file" onChange={ event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Selecione uma imagem"/>
            </label>
            <label htmlFor="company">Empresa *</label>
            <input 
                type="text"
                id="company"
                placeholder="Sua incrível empresa"
                value={company}
                onChange={event => setCompany(event.target.value)}
            />

            <label htmlFor="techs">Tecnologias * <span>(separadas por vírgula)</span></label>
            <input 
                type="text"
                id="techs"
                placeholder="Quais tecnologias usam"
                value={techs}
                onChange={event => setTechs(event.target.value)}
            />

            <label htmlFor="price">Valor da Diária * <span>(em branco para gratuito)</span></label>
            <input 
                type="text"
                id="price"
                placeholder="Valor cobrado por dia"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />
            <button className="btn">Cadastrar</button>
        </form>
    )
}