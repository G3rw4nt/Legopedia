import axios from "axios";

const link = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:5000";

export const postParts = async (data) => {
    try {
        const response = await axios.post(`${link}/parts`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const postSets = async (data) => {
    try {
        const response = await axios.post(`${link}/sets`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}