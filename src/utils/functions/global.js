import { Buffer } from "buffer";
import {
  IMAGE_MIME_TYPE,
  NO_STRING,
} from "../../variables/global";

// Whatsapp sender
export function sendWACS() {
  // Send static Whatsapp messages to Customer Service
  // TODO: Insert the Whatsapp number to ENV
  return window.open(
    `https://wa.me/${6281280111698}?text=Hi%20kak%20mau%20nanya%20dong%20!%20!%20!`,
    "_blank"
  );
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
    window.removeEventListener(
      "mousemove",
      mouseMoveHandler
    );
    window.removeEventListener("mouseup", mouseUpHandler);

    ele.style.cursor = "grab";
    ele.style.removeProperty("user-select");
  }

  // Change the cursor and prevent user from selecting the text
  ele.style.cursor = "grabbing";
  ele.style.userSelect = "none";

  window.addEventListener("mousemove", mouseMoveHandler);
  window.addEventListener("mouseup", mouseUpHandler);
}

export function smoothScrollTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

export const getBase64 = (file) => {
  // file reader is a promise
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const b64toBlob = (
  b64Data,
  contentType = "",
  sliceSize = 512
) => {
  var base64result = b64Data.split(",")[1];
  if (!contentType)
    contentType = b64Data.substring(
      "data:".length,
      b64Data.indexOf(";base64")
    );
  const byteArray = Buffer.from(base64result, "base64");
  const byteArrays = [];
  byteArrays.push(byteArray);

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export function handleOpenModal(
  setModalToggle,
  modalToggle
) {
  setModalToggle(!modalToggle);
}

export function handleErrorMessage(
  error,
  setErrorMessage,
  setModalToggle,
  modalToggle
) {
  if (!error) return;
  if (!error.errorContent) return;
  if (typeof error.errorContent !== "string")
    setErrorMessage(JSON.stringify(error.errorContent));
  else setErrorMessage(error.errorContent);
  handleOpenModal(setModalToggle, modalToggle);
}

export function handleError500() {
  window.location.replace("/error500");
}

export function handleOpenOverridingHome(overridingName) {
  window.location.replace(`/?openWindow=${overridingName}`);
}

export function handlePageNavigation(navMenu) {
  window.handleOpenOverriding(NO_STRING);
  window.location.href = navMenu;
}

export function catchPromiseErrors(error) {
  try {
    if (!error) return (window.location.href = "/");
    if (!error.errorContent)
      return (window.location.href = "/");
    else throw new Error(error.errorContent);
  } catch (e) {
    console.error(e);
    return (window.location.href = "/");
  }
}

export function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export const delayInMilliSecond = (ms) =>
  new Promise((res) => setTimeout(res, ms));

export const showDisplayName = (obj) => {
  if (obj)
    return obj.details
      ? obj.details.fullName
      : `Guest-${obj.socketId}`;
};

export const isImageType = (type) => {
  return IMAGE_MIME_TYPE.includes(type);
};

export const removeLeadingZeros = (str) => {
  // Use regular expression to remove leading zeros
  return str.replace(/^0+/, "");
};

export const formattedNumber = (number) => {
  if (isNaN(number)) number = 0;
  return new Intl.NumberFormat().format(number);
};

export const unformattedNumber = (formattedString) => {
  // Remove any non-numeric characters and parse the string to a number
  const unformattedString = formattedString.replace(
    /[^\d.-]/g,
    ""
  );
  return parseFloat(unformattedString);
};

export const acceptNumericOnly = (input) => {
  // Remove any non-numeric characters
  input = input.replace(/[^0-9]/g, "");
  return input;
};

export const formatDateID = (date) => {
  const inputDate = new Date(date);

  // Indonesian days of the week
  const indonesianDaysOfWeek = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  const dayName =
    indonesianDaysOfWeek[inputDate.getUTCDay()];
  const day = inputDate.getUTCDate();
  const month = inputDate.getUTCMonth() + 1;
  const year = inputDate.getUTCFullYear();

  const formattedDate = `${dayName}, ${day
    .toString()
    .padStart(2, "0")}-${month
    .toString()
    .padStart(2, "0")}-${year}`;

  return formattedDate;
};

export const addValueToArray = (
  field,
  defaultValue,
  data,
  setData
) => {
  const temp = { ...data };
  temp[field].push(defaultValue);
  setData(temp);
};

export const removeValueFromArray = (
  field,
  index,
  data,
  setData
) => {
  const temp = { ...data };
  temp[field].splice(index, 1);
  setData(temp);
};

export const getURLParams = (url, key) =>
  url.searchParams.get(key);

export const setURLParams = (url, key, val) => {
  url.searchParams.set(key, val);
  const newUrl = url.toString();
  window.history.pushState({}, "", newUrl);
};
