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
            period: "/ Day",
        }
    ],
    productStocks: "",
    pickupCity: "",
    pickupSubdistrict: "",
    pickupWard: "",
    pickupAddress: "",
    pickupPostalCode: "",
    productMaxWaitTime: "",
    productMaxWaitTimePeriod: "/ Hour",
    courierChoosen: [
        "JNE"
    ]
}

export const defaultPrice = {
    price: 0,
    period: "/ Day",
}

export const defaultCourier = "JNE"
export const courierValues = ["JNE", "SiCepat"];
export const periodValues = ["/ Hour", "/ 3 Hour", "/ 7 Hour", "/ Day", "/ 3 Day", "/ 7 Day"];
export const pricePeriodValues = ["/ Day", "/ 3 Day", "/ 7 Day", "/ 15 Day", "/ 30 Day", "/ Month", "/ 3 Month", "/ 6 Day", "/ 12 Month", "/ Year"];
export const typeValues = ["Physical Rental", "Digital Rental"];