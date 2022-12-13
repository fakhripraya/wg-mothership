import axios from "axios";
import { useState, useCallback } from "react";
import { createAxios } from "../../config/xhr/axios";
import { GET, POST } from "../../variables/global";

// get data without parameter
export const useAxiosGet = () => {

    // Function State
    const [responseData, setResponseData] = useState(null)
    const [responseStatus, setStatus] = useState(null)
    const [responseError, setError] = useState(false);
    const [errorContent, setErrorContent] = useState(null);

    const getData = useCallback(async (reqConfig) => {

        // creates the cancel token source
        var cancelSource = axios.CancelToken.source();

        // Start timing now
        console.time("Load Time");

        await createAxios(reqConfig.endpoint)({
            method: GET,
            url: reqConfig.url,
            cancelToken: cancelSource.token
        }).then(response => {
            setResponseData(response.data);
            setStatus(response.status)
        }).catch(error => {
            if (error.response) {
                if (axios.isCancel(error)) cancelSource.cancel();
                setError(true);
                setErrorContent(error.response.data);
                setStatus(error.response.status);
            } else setStatus(500);
        });

        // End timing now
        console.timeEnd("Load Time");

    }, []);

    return { getData, responseData, responseError, errorContent, responseStatus };
};

// get data without parameter
export const useAxiosPost = () => {

    // Function State
    const [responseData, setResponseData] = useState(null)
    const [responseStatus, setStatus] = useState(null)
    const [responseError, setError] = useState(false);
    const [errorContent, setErrorContent] = useState(null);

    const postData = useCallback(async (reqConfig) => {

        // creates the cancel token source
        var cancelSource = axios.CancelToken.source();

        // Start timing now
        console.time("Load Time");

        await createAxios(reqConfig.endpoint)({
            method: POST,
            url: reqConfig.url,
            data: reqConfig.data,
            cancelToken: cancelSource.token
        }).then(response => {
            setResponseData(response.data);
            setStatus(response.status)
        }).catch(error => {
            if (error.response) {
                if (axios.isCancel(error)) cancelSource.cancel();
                setError(true);
                setErrorContent(error.response.data);
                setStatus(error.response.status);
            } else setStatus(500);
        });

        // End timing now
        console.timeEnd("Load Time");

    }, []);

    return { postData, responseData, responseError, errorContent, responseStatus };
};