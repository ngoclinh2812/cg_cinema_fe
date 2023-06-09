import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/css/navigation";
import MovieCard from "../card/MovieCard";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    getMovies,
    selectMovieList,
    setSuccess,
} from "../../components/movie/movieSlice";
import axios from 'axios';

export const MovieSlider = () => {
    const [movies, setMovies] = useState([]);
    const movieList = useSelector(selectMovieList);
    const success = useSelector((state) => state.movie.success);
    const dispatch = useDispatch();

    useEffect(() => {
        const getMovieList = async () => {
            if (!success) {
                dispatch(getMovies());
            } else {
                setMovies(movieList);
                dispatch(setSuccess(true));
            }
        };

        getMovieList();
    }, [success]);

    return (
        <>
            <div className="font-semibold text-4xl mx-auto">Featured Movie</div>
            <div className="relative">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={3}
                    onSlideChange={() => console.log("slide change")}
                    onSwiper={(swiper) => console.log(swiper)}
                    className="my-6 mx-auto"
                >
                    <SwiperSlide>
                        <h2>
                            <Link to={`/`}>home page</Link>
                        </h2>
                        <h2>Search Results</h2>
                        {movieList && movieList.length > 0 ? (
                            <table>
                                <thead>
                                <tr>
                                    <th>id</th>
                                    <th>name</th>
                                    <th> img</th>
                                    <th>ticket lass</th>
                                    <th>ticket price</th>
                                </tr>
                                </thead>
                                <tbody>
                                {movies.map((trip) => (
                                    <tr key={trip.id}>
                                        <td>{trip.name}</td>
                                        <td>{trip.img}</td>
                                        {/*<td>{trip.departureTime}</td>*/}
                                        {/*<td>{trip.ticketClass}</td>*/}
                                        {/*<td>{trip.ticketPrice}</td>*/}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No results found</p>
                        )}
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    );
};

