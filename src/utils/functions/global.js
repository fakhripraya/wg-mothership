import { Buffer } from 'buffer';

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

export const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    var base64result = b64Data.split(',')[1];
    if (!contentType)
        contentType = b64Data.substring("data:".length, b64Data.indexOf(";base64"));
    const byteArray = Buffer.from(base64result, 'base64');
    const byteArrays = [];
    byteArrays.push(byteArray);

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

export function handleOpenModal(setModalToggle, modalToggle) {
    setModalToggle(!modalToggle);
}

export function handleErrorMessage(error, setErrorMessage, setModalToggle, modalToggle) {
    if (!error) return;
    if (!error.errorContent) return;
    if (typeof error.errorContent !== 'string') setErrorMessage(JSON.stringify(error.errorContent));
    else setErrorMessage(error.errorContent);
    handleOpenModal(setModalToggle, modalToggle);
}

export function handleError500() {
    window.location.replace('/error500');
}

export function handleOpenOverridingHome(overridingName) {
    window.location.replace(`/?openWindow=${overridingName}`);
}

export function catchPromiseErrors(error, navigate) {
    try {
        if (!error) return navigate('/');;
        if (!error.errorContent) return navigate('/');
        else throw new Error(error.errorContent);
    } catch (e) {
        console.error(e);
        return navigate('/');
    }
}

export const delayInMilliSecond = (ms) => new Promise(res => setTimeout(res, ms));