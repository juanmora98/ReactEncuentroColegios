import React from 'react';
import '../styles/styles.css';

function MainDescription(props) {
    return (
        <div className="main-description">
            <h1>{props.title}</h1>
            <p>
                {props.description}
            </p>
        </div>
    );
}
export default MainDescription;