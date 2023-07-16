import React, { useRef, useState, useEffect } from 'react';
import "./style.scss"

export default function DynamicAccordion(props) {

    const listRef = useRef();
    const caretRef = useRef();
    const plusRef = useRef();
    const [toggle, setToggle] = useState(props.toggle);

    // FUNCTION SPECIFICS //
    function handleAccordionClick() {
        setToggle(!toggle);
    }

    // COMPONENT SPECIFICS //
    const ShowItems = () => {
        if (!props.isButton) return props.children
        return props.data.map((item, index) => {
            return <button key={`dynamic-accordion-${item.title}-${index}`} className="dynamic-accordion-button">
                <h6 className="dynamic-accordion-subtitle light-color">{item.title}</h6>
            </button>
        })
    }

    useEffect(() => {
        if (toggle) {
            listRef.current.style.maxHeight = "500px";
            caretRef.current.style.transform = "rotate(180deg)";
        }
        else {
            listRef.current.style.maxHeight = "0px";
            caretRef.current.style.transform = "rotate(0deg)";
        }
    }, [toggle])

    return (
        <div className={"dynamic-accordion-wrapper " + props.className}>
            <div onClick={() => handleAccordionClick()} className="dynamic-accordion-button-wrapper">
                <button className="dynamic-accordion-button">
                    <h2 className="dynamic-accordion-title light-color">{props.title}</h2>
                </button>
                <div className="dynamic-accordion-title-prefixes">
                    <span className="dynamic-accordion-button-label-caret" ref={caretRef} />
                    <span onClick={(e) => { e.stopPropagation() }} className="dynamic-accordion-button-label-plus" ref={plusRef} />
                </div>
            </div>
            <div ref={listRef} className="dynamic-accordion-lists-container">
                <ShowItems />
            </div>
        </div>
    )
}