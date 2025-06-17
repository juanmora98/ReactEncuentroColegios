import React from 'react';
import NavBar from 'core/components/NavBar/components/NavBar';
import MainDescription from 'core/components/MainDescription/components/mainDescription';
import CardList from '../cards/components/cardList';

function index() {

    const cards = [
        {
            title: "Actividad 1",
            description: "Descripción de la actividad 1 para colegios.",
            URLImage: "https://example.com/image1.jpg",
            ingenierias: ["ingenieria de sistemas", "ingenieria estadistica", "ingenieria de ciberseguridad", "ingenieria de inteligencia artificial"]
        },
        {
            title: "Actividad 2",
            description: "Descripción de la actividad 2 para colegios.",
            URLImage: "https://example.com/image2.jpg",
            ingenierias: ["ingenieria de sistemas", "ingenieria estadistica", "ingenieria de ciberseguridad", "ingenieria de inteligencia artificial"]
        },
        {
            title: "Actividad 3",
            description: "Descripción de la actividad 3 para colegios.",
            URLImage: "https://example.com/image3.jpg",
            ingenierias: ["ingenieria de sistemas", "ingenieria estadistica", "ingenieria de ciberseguridad", "ingenieria de inteligencia artificial"]
        }
    ]

    return (
        <div className="Background">
            <NavBar ing="sistemas" ingName="ingenieria de sistemas" />
            <main>
                <MainDescription
                    title="ACTIVIDADES PARA COLEGIOS"
                    description="Listado de actividades diseñadas para realizar en visitas escolares con el objetivo de fomentar el interés por la ingeniería."
                />
                <CardList cards={cards} />
            </main>

        </div>
    );
}

export default index;