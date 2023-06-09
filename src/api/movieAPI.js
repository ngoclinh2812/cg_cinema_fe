import axios from "axios";
const Movie_API ="http://localhost:8080/api/movies";

export const movies = async () => {
    let result = null;
    try {
        result = await axios.get(`${Movie_API}`);
    } catch (e) {
        console.log("Find movie API error: " + e);
    }
    return result;
};