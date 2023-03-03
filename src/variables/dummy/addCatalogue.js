export const initialValue = {
    productName: "",
    productType: "Physical Rental",
    productDescription: "",
    productCategory: "",
    productDisplayCategory: "",
    productHashtag: "",
    productCondition: "",
    productWeight: "",
    productPrices: [
        {
            price: 0,
            period: "/ Hari",
        }
    ],
    productStocks: "",
    pickupCity: "",
    pickupSubdistrict: "",
    pickupWard: "",
    pickupAddress: "",
    pickupPostalCode: "",
    productMaxWaitTime: "",
    productMaxWaitTimePeriod: "/ Jam",
    courierChoosen: [
        "JNE"
    ]
}

export const defaultPrice = {
    price: 0,
    period: "/ Hari",
}

export const defaultCourier = "JNE"
export const courierValues = ["JNE", "SiCepat"];
export const waitTimeValues = ["/ Menit", "/ Jam", "/ Hari"];
export const pricePeriodValues = ["/ Hari", "/ 3 Hari", "/ 7 Hari", "/ 15 Hari", "/ 30 Hari"];
export const typeValues = ["Rental Fisik", "Rental Digital"];