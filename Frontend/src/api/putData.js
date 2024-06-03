import axios from "axios";

const link = process.env.BACKEND_URL ?? "http://localhost:5000";

export const putParts = async (data) => {
    try {
        const response = await axios.put(`${link}/parts`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const putSets = async (data) => {
    try {
        const response = await axios.put(`${link}/sets`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        return error;
    }
}