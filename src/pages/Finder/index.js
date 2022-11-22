import React from 'react';
import './style.scss';

export default function Finder() {

    let pos = { top: 0, left: 0, x: 0, y: 0 };

    function scrollCarousel(e, ele) {
        pos = {
            // The current scroll
            left: ele.scrollLeft,
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY,
        };

        function mouseMoveHandler(e) {
            // How far the mouse has been moved
            const dx = e.clientX - pos.x;

            // Scroll the element
            ele.scrollLeft = pos.left - dx;
        }

        function mouseUpHandler() {
            window.removeEventListener('mousemove', mouseMoveHandler);
            window.removeEventListener('mouseup', mouseUpHandler);

            ele.style.cursor = 'grab';
            ele.style.removeProperty('user-select');
        }

        // Change the cursor and prevent user from selecting the text
        ele.style.cursor = 'grabbing';
        ele.style.userSelect = 'none';

        window.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('mouseup', mouseUpHandler);
    }

    return (
        <div className="finder-container">
            <div className="finder-wrapper">
            </div>
        </div>
    )
}
