import db from "../../config/indexeddb";

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

export const clearForm = (storageKey) => {
    if (!storageKey) return;
    db.transaction('rw', db[storageKey], function* () {
        yield db[storageKey].clear();
    }).catch(e => {
        console.error(e);
    });
}

export const setFiles = async (files, objectId, storageKey, fieldKey) => {
    if (!files) return;
    if (!objectId) return;
    files.forEach((file) => {
        getBase64(file).then(async (base64) => {
            await db.transaction('rw', db[storageKey],async function () {
                await db[storageKey].count().then(async (count)=>{
                    if(count > 0) await db[storageKey].update(objectId, {[fieldKey]: base64}).resolve();
                });
            }).catch(e => {
                console.error(e);
            });
        });
    });
}

export const getFilesById = (objectId, storageKey, fieldKey) => {
    if (!objectId) return;
    db.transaction('rw', db[storageKey], function* () {
        const existing = db[storageKey].get({id: objectId});
        if(existing) yield existing[fieldKey];
        else yield null;
    }).catch(e => {
        console.error(e);
    });
}

export const getFirstTableValue = async (storageKey) => {
    let result = undefined;
    await db.transaction('rw', db[storageKey], async function () {
        result = await db[storageKey].toCollection().first().then((exist)=>{
            if(exist) return exist;
            else return null;
        });
    }).catch(e => {
        console.error(e);
    });
    return result;
}

export const getFirstValueByField = async ( storageKey, fieldKey) => {
    let result = undefined;
    await db.transaction('rw', db[storageKey], async function () {
        result = await db[storageKey].toCollection().first().then((exist)=>{
            if(exist) return exist[fieldKey];
            else return null;
        });
    }).catch(e => {
        console.error(e);
    });
    return result;
}