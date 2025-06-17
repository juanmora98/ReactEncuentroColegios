import React from 'react';
import '../styles/card.css';
import "core/components/Buttons/styles/buttons.css"
import {NavigationOnClickWithState} from "services/scripts/Navigation.js"

function Card({ title, description, URLImage, ingenierias }) {
    const navigate = NavigationOnClickWithState();
    const state = {
        title: title,
        description: description,
        URLImage: URLImage,
        ingenierias: ingenierias
    }
    return (
        <div className="Card">
            <h3>{title}</h3>
            <p>{description}</p>
            <img src={URLImage} alt={title} />
            <div className="button-container">
                <button className="custom-buttons" onClick={() => navigate(`/actividad/${title}`)}>Iniciar Actividad</button>
                <button className="custom-buttons" onClick={() => navigate(`/actividad/${title}/requerimientos`)}>Requerimientos</button>
            </div>
        </div>
    );
}
export default Card;