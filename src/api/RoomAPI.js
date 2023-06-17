import axios from "axios";

const CG_THEATER_API = "http://localhost:8080/api"

export const findRoom = async (roomId) => {
    let result = null;
    try {
        result = await axios.get(`${CG_THEATER_API}/room/${roomId}`);
        console.log(result);
    } catch (e) {
        console.log("Find room API error: " + e)
    }
    return result;
};