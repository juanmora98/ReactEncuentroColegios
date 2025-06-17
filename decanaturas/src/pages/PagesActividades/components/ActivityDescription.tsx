import React from 'react';
import "../styles/activityDescrition.css"

function ActivityDescription(props) {
    return (
        <React.Fragment>
            <div className="activity-title">
                <h1>{props.title}</h1>
                <h2>{props.activityTitle}</h2>
            </div>
            <div className="activity-description">
                <h3 className="Title-Center">{props.subtitle}</h3>
                <div className="Description-Center">
                  {props.description}
                </div>
                {props.complement}
            </div>
        </React.Fragment>
    );
}

export default ActivityDescription;
