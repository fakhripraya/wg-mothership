import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import "./style.scss"

export default function Accordion(props) {

    const listRef = useRef();
    const iconRef = useRef();
    const [toggle, setToggle] = useState(true);

    function handleAccordionClick() {
        setToggle(!toggle);
    }

    useLayoutEffect(() => {
        if (toggle) {
            listRef.current.style.maxHeight = "500px";
            iconRef.current.style.transform = "rotate(180deg)";
        }
        else {
            listRef.current.style.maxHeight = "0px";
            iconRef.current.style.transform = "rotate(0deg)";
        }
    }, [toggle])

    return (
        <div className="accordion-wrapper">
            <button onClick={() => handleAccordionClick()} className="accordion-button">
                <h3 className="accordion-title light-color">{props.title}</h3>
                <span class="accordion-button-label-after" ref={iconRef} />
            </button>
            <div ref={listRef} className="accordion-lists-container">
                {
                    props.data.map((item, index) => {
                        return <button key={`accordion-${item.title}-${index}`} className="accordion-button">
                            <h6 className="accordion-subtitle light-color">{item.title}</h6>
                        </button>
                    })
                }
            </div>
        </div>
    )
}
