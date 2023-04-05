import axios from "axios";

export const createAxios = (baseUrl) => {
    return axios.create({
        baseURL: baseUrl,
        timeout: 61000,
        withCredentials: true,
    });
}