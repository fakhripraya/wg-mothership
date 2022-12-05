import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import './style.scss';

export default function Error404() {

    const navigate = useNavigate();

    return (
        <div className="error404-container">
            <div className="error404-wrapper">
                <div className="error404-title">
                    <h1 className="margin-bottom-0">ERROR 404</h1>
                    <h2>This page is either <span className="red-color">not found</span> or is under <span className="red-color">maintenance</span></h2>
                    <Button onClick={() => navigate('/')}>Back to home</Button>
                </div>
            </div>
        </div>
    )
}