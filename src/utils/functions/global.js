// Whatsapp sender
export function sendWACS() {
    // Send static Whatsapp messages to Customer Service
    // TODO: Insert the Whatsapp number to ENV
    return window.open(`https://wa.me/${6281280111698}?text=Hi%20kak%20mau%20nanya%20dong%20!%20!%20!`, '_blank');
}

// Scroll Y Carousel function
let pos = { top: 0, left: 0, x: 0, y: 0 };
export function scrollCarousel(e, ele) {

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

export function smoothScrollTop() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

export const getBase64 = (file) => {
    // file reader is a promise
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}