import axios from "axios";
import { MOVIE_API } from "./API";
const Movie_API ="http://localhost:8080/api";

export const fetchMoviesFromAPI = async () => {
    let result = null;
    try {
        result = await axios.get(`${Movie_API}/movies`);
    } catch (e) {
        console.log("Find movie API error: " + e);
    }
    return result;
};

export const movie = async (movieId) => {
    const response = null;
    try {
        response = await axios.get(`${MOVIE_API}/${movieId}`)
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        // Handle error
        return null;
    }
}