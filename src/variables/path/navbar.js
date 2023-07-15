import {
    DASHBOARD,
    HOME,
    RENTAL_MARKET
} from "../global"

export const getMenus = () => {
    return [
        {
            key: HOME,
            name: "Home",
            route: "/"
        },
        {
            key: DASHBOARD,
            name: "Dashboard",
            route: "/dashboard"
        },
        {
            key: RENTAL_MARKET,
            name: "Rental Market",
            route: "/search"
        }
    ]
}