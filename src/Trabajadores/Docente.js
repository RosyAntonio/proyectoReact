import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './App.css';

// Registra las escalas y elementos necesarios
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ListaContactos = () => {
    const [contactos, setContactos] = useState([]);

    useEffect(() => {
        const fetchContactos = async () => {
            const response = await fetch('https://alex.starcode.com.mx/apiBD.php'); //http://localhost/apiprueba/api.php
            const data = await response.json();
            setContactos(data);
        };

        fetchContactos();

        const interval = setInterval(fetchContactos, 2000);

        return () => clearInterval(interval);
    }, []);

    const data = {
        labels: contactos.map((contacto) => contacto.nombre),
        datasets: [
            {
                label: 'IDs de Clientes',
                data: contactos.map((contacto) => contacto.id),
                backgroundColor: ['#71C9CE', '#A29BFE', '#FAB1A0', '#FF7675', '#55EFC4'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="App">
            <h1 className="App-title">REGISTRO DE CLIENTES</h1>
            <div className="cards-container">
                {contactos.map((contacto) => (
                    <div key={contacto.id} className="card">
                        <p>ID: <strong>{contacto.id}</strong></p>
                        <p>Nombre: <strong>{contacto.nombre}</strong></p>
                        <p>Teléfono: <strong>{contacto.telefono}</strong></p>
                        <p>Sexo: <strong>{contacto.sexo}</strong></p>
                    </div>
                ))}
            </div>
            <h2>Gráfico POR IDs de Clientes</h2>
            <div className="chart-container">
                <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
        </div>
    );
};

export default ListaContactos;
