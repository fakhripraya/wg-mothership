import React, { useRef, useState, useEffect } from 'react';
import "./style.scss"

export default function Accordion(props) {

    const listRef = useRef();
    const iconRef = useRef();
    const [toggle, setToggle] = useState(props.toggle);

    // FUNCTION SPECIFICS //
    function handleAccordionClick() {
        setToggle(!toggle);
    }

    // COMPONENT SPECIFICS //
    const ShowItems = () => {
        if (!props.isButton) return props.children
        return props.data.map((item, index) => {
            return <button key={`accordion-${item.title}-${index}`} className="accordion-button">
                <h6 className="accordion-subtitle light-color">{item.title}</h6>
            </button>
        })
    }

    useEffect(() => {
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
        <div className={"accordion-wrapper " + props.className}>
            <button onClick={() => handleAccordionClick()} className="accordion-button">
                <h2 className="accordion-title light-color">{props.title}</h2>
                <span className="accordion-button-label-after" ref={iconRef} />
            </button>
            <div ref={listRef} className="accordion-lists-container">
                <ShowItems />
            </div>
        </div>
    )
}
