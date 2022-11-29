import React from 'react';
import './style.scss';

export default function Card(props) {
    return (
        <div className={"card-container " + props.className}>
            <img className="card-img" src={props.imgUrl} alt={props.title}></img>
            <h1 className="light-color">
                {props.title}
            </h1>
            <h3 className="margin-bottom-0 light-color">
                {props.location}
            </h3>
            <h3 style={{ marginTop: "0.2em" }} className="margin-bottom-0 main-color">
                From {props.price}
            </h3>
            <p className="light-color">
                {props.desc}
            </p>
        </div>
    )
}
