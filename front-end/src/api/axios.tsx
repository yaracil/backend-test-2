import axios from "axios"; import {server_address} from "../util/Constants";

const ApiProtectedWS = (token: string, baseUrl: string) => {
    const args = {
        baseURL: server_address+"/" + baseUrl,
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            Authorization: "Bearer " + token,
        },
    };
    return axios.create(args);
};
const ApiOpenWS = (baseUrl: string) => {
    const args = {
        baseURL: server_address+"/" + baseUrl,
        crossdomain: true,
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        },
    };
    return axios.create(args);
};

export {ApiProtectedWS, ApiOpenWS};
