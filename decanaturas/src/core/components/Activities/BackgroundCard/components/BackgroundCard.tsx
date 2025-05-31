import React from 'react';
import '../styles/BackgroundCard.css';

function BackgroundCard(props) {
    return (
        <div className="BackgroundCard">
          {props.children}
        </div>
    );
}

export default BackgroundCard;