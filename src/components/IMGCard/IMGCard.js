import React from "react";
import "./IMGCard.css";

const IMGCard = props => (
    <div className="card">
        <div className="img-container hvr-underline-from-center">
            <img onClick={() => props.handleClick(props.id)} alt={props.name} src={props.image} />
        </div>
    </div>
);

export default IMGCard;