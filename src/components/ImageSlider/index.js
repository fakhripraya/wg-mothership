import './style.scss';
import FloatButton from '../FloatButton';
import React, { useEffect, useRef, useState } from 'react';
import { styleInitialState, styleSlideLeft, styleSlideRight } from '../../variables/styles/carousel';
import dummy from "../../config/json/development/carouselDummy.json";

export default function ImageSlider() {

    const imgRef = useRef();
    const [current, setCurrent] = useState({
        currentPrev: null,
        current: null,
        currentNext: null
    });
    const [list, setList] = useState([]);
    const [toggleSlide, setToggleSlide] = useState("");
    const [style, setStyle] = useState(styleInitialState);

    useEffect(() => {

        // TODO: differ between production and development
        // in production it will be an http request to the backend service
        // in development this will use local json dummy
        const carouselData = dummy;
        const renderCurrent = {
            currentPrev: carouselData[prevArrayItem(carouselData[0], carouselData)],
            current: carouselData[0],
            currentNext: carouselData[nextArrayItem(carouselData[0], carouselData)]
        }

        setList(carouselData);
        setCurrent(renderCurrent);
    }, []);

    function handleRedirectOnImgClick(urlRedirect) {
        window.open(urlRedirect, '_blank');
    }

    function handleSetCurrent(temp, array) {
        return {
            current: temp,
            currentPrev: array[prevArrayItem(temp, array)],
            currentNext: array[nextArrayItem(temp, array)]
        }
    }

    function prevArrayItem(current, array) {
        const index = array.indexOf(current);
        let toIndex = index - 1;
        if (toIndex < 0) toIndex = array.length - 1;

        return toIndex
    }

    function nextArrayItem(current, array) {
        const index = array.indexOf(current);
        let toIndex = index + 1;
        if (toIndex === array.length) toIndex = 0;

        return toIndex
    }

    function handleSlideLeft() {
        if (toggleSlide === "LEFT") {
            const toIndex = nextArrayItem(current.current, list);
            const temp = list[toIndex];

            setCurrent(handleSetCurrent(temp, list));
            setStyle({ ...styleInitialState })
        }
    }

    function handleSlideLeftAnimation() {
        setToggleSlide("LEFT");
        setStyle(styleSlideLeft(imgRef));
    }

    function handleSlideRight() {
        if (toggleSlide === "RIGHT") {
            const toIndex = prevArrayItem(current.current, list);
            const temp = list[toIndex];

            setCurrent(handleSetCurrent(temp, list));
            setStyle({ ...styleInitialState })
        }

    }

    function handleSlideRightAnimation() {
        setToggleSlide("RIGHT");
        setStyle(styleSlideRight(imgRef));
    }

    return (
        <div className="imageslider-container">
            <FloatButton onClick={() => handleSlideLeftAnimation()} className="imageslider-button imageslider-left-button" >❰</FloatButton>
            <div className="imageslider-wrapper">
                <img
                    onTransitionEnd={() => handleSlideLeft()}
                    style={{ ...style.imgNext }}
                    onClick={() => handleRedirectOnImgClick(current.currentPrev && current.currentPrev.urlRedirect)}
                    src={current.currentPrev && current.currentPrev.url}
                    alt={current.currentPrev && current.currentPrev.alt}></img>
                <img
                    style={{ ...style.img }}
                    ref={imgRef}
                    onClick={() => handleRedirectOnImgClick(current.current && current.current.urlRedirect)}
                    src={current.current && current.current.url}
                    alt={current.current && current.current.alt}></img>
                <img
                    onTransitionEnd={() => handleSlideRight()}
                    style={{ ...style.imgPrev }}
                    onClick={() => handleRedirectOnImgClick(current.currentNext && current.currentNext.urlRedirect)}
                    src={current.currentNext && current.currentNext.url}
                    alt={current.currentNext && current.currentNext.alt}></img>
            </div>
            <FloatButton onClick={() => handleSlideRightAnimation()} className="imageslider-button imageslider-right-button">❱</FloatButton>
        </div>
    )
}
