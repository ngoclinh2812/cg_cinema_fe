import axios from "axios";

const CG_THEATER_API = "http://localhost:8080/api"

export const findAllTheaters = async () => {
    let result = null;
    try {
        result = await axios.get(`${CG_THEATER_API}/theaters`);
    } catch (e) {
        console.log("Find all theaters API error: " + e)
    }
    return result;
};

export const findTheater = async (theaterId) => {
    let result = null;
    try {
        result = await axios.get(`${CG_THEATER_API}/theaters/${theaterId}`);
        console.log(result.data);
    } catch (e) {
        console.log("Find theater API error: " + e)
    }
    return result;
};