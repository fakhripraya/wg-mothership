import React from 'react';
import './style.scss';

export default function Card(props) {
    return (
        <div className={"card-container " + props.className}>
            <img className="card-img" src={props.imgUrl} alt={props.title}></img>
            <h2 className="light-color">
                {props.title}
            </h2>
            <p className="margin-bottom-0 light-color">
                {props.location}
            </p>
            <p style={{ marginTop: "0.2em" }} className="margin-bottom-0 main-color">
                From {props.price}
            </p>
            <p className="light-color">
                {props.desc}
            </p>
        </div>
    )
}
