import React from 'react';
import Card from './card';
import "../styles/cardList.css";

function CardList({ cards }) {
    return (
        <div className="CardList">
            {cards.map((card, index) => (
                <Card key={index} {...card} />
            ))}
        </div>
    );
}

export default CardList;
