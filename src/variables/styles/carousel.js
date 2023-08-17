export const styleInitialState = {
  imgPrev: {
    transform: "translateX(0%)",
    transitionProperty: "none",
    opacity: 0,
    visibility: "hidden",
  },
  img: {
    transform: "translateX(0%)",
    transitionProperty: "none",
    opacity: 1,
    visibility: "visible",
  },
  imgNext: {
    transform: "translateX(0%)",
    transitionProperty: "none",
    opacity: 0,
    visibility: "hidden",
  },
};

export const styleSlideLeft = (ref) => {
  return {
    imgNext: {
      visibility: "hidden",
      opacity: 0,
      transform: `translateX(-${ref.current.offsetWidth}px)`,
      transition: "all 1s ease-out",
    },
    img: {
      visibility: "hidden",
      opacity: 0,
      transform: `translateX(-${ref.current.offsetWidth}px)`,
      transition: "all 1s ease-out",
    },
    imgPrev: {
      visibility: "visible",
      opacity: 1,
      transform: `translateX(-${ref.current.offsetWidth}px)`,
      transition: "all 1s ease-out",
    },
  };
};

export const styleSlideRight = (ref) => {
  return {
    imgNext: {
      visibility: "visible",
      opacity: 1,
      transform: `translateX(${ref.current.offsetWidth}px)`,
      transition: "all 1s ease-out",
    },
    img: {
      visibility: "hidden",
      opacity: 0,
      transform: `translateX(${ref.current.offsetWidth}px)`,
      transition: "all 1s ease-out",
    },
    imgPrev: {
      visibility: "hidden",
      opacity: 0,
      transform: `translateX(${ref.current.offsetWidth}px)`,
      transition: "all 1s ease-out",
    },
  };
};
