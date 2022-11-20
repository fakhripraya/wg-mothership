import { handleOpenLoginModal } from "../../utils/functions/credentials"

export const styleInitialState = {
    navbarHeader: {
        transform: `translateY(0%)`
    },
    navbar: {
        transform: `translateY(0%)`
    },
}

export const onScrollY = (navRef) => {
    return {
        navbarHeader: {
            transform: `translateY(-${navRef.current.offsetHeight}px)`
        },
        navbar: {
            transform: `translateY(calc(-${navRef.current.offsetHeight}px + -100%))`
        },
    }
}

export const getMenus = () => {
    return [
        {
            name: "Home",
            url: "/"
        },
        {
            name: "Rental",
            url: "/rental"
        },
        {
            name: "Finder",
            url: "/finder"
        },
    ]
}