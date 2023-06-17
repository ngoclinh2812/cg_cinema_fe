import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/css/navigation";
import MovieCard from "../card/MovieCard";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMovies, setSuccess } from "../../features/movie/movieSlice";
import { Button } from '@material-tailwind/react';


export const MovieSlider = () => {
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const movieList = useSelector((state) => state.movie.movies);
    const success = useSelector((state) => state.movie.success);
    const dispatch = useDispatch();

    const getMovieList = async () => {
        if (!success) {
            dispatch(fetchMovies());
        } else {
            dispatch(setSuccess(true));
        }
    };

    useEffect(() => {
        getMovieList();
    }, []);

    useEffect(() => {
        console.log(movieList);
    }, [movieList]);

    const handleSearch = () => {
        const results = movieList.filter((movie) =>
            movie.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setSearchResults(results);
    };
    const filterMoviesByStatus = async (status) => {
        try {
            const response = await (`/movies?status=${status}`);
            const movies = response.data;
            setSearchResults(movies);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            {/*<div>*/}
            {/*    <div className="flex items-center justify-center space-x-4">*/}
            {/*        <button*/}
            {/*            type="button"*/}
            {/*            className="px-4 py-2 ml-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"*/}
            {/*            onClick={() => filterMoviesByStatus("Now Showing")}*/}
            {/*        >*/}
            {/*            Now Showing*/}
            {/*        </button>*/}
            {/*        <button*/}
            {/*            type="button"*/}
            {/*            className="px-4 py-2 ml-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"*/}
            {/*            onClick={() => filterMoviesByStatus("Coming Soon")}*/}
            {/*        >*/}
            {/*            Coming Soon*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className="font-semibold text-4xl mx-auto">Featured Movie</div>*/}
            <div className="relative">
                <h2 className="text-4xl font-bold text-center mb-6">Search movies</h2>

                <div className="flex justify-center mt-4">
                    <input
                        type="text"
                        placeholder="Search Movie"
                        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <Button
                        type="button"
                        color="teal" ripple="light" rounded={true} size="lg"
                        style={{marginLeft: '10px'}}
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </div>
                <Swiper
                    spaceBetween={80}
                    slidesPerView={4}
                    onSlideChange={() => console.log("slide change")}
                    onSwiper={(swiper) => console.log(swiper)}
                    className="my-6 mx-auto"
                >
                    {(searchValue !== "" ? searchResults : movieList || []).map(
                        (movie) => (
                            <SwiperSlide key={movie.id}>
                                <Link to={`/movies/${movie.id}`}>
                                    <MovieCard
                                        title={
                                            movie.name.length > 20 ? `${movie.name.substring(0, 15)}...` : movie.name
                                        }
                                        imageUrl={movie.img}
                                        id = {movie.id}
                                    />
                                </Link>
                            </SwiperSlide>
                        )
                    )}
                </Swiper>
            </div>
        </>
    );
};