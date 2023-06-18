import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/css/navigation";
import MovieCard from "../card/MovieCard";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchMovies, setSuccess } from "../../features/movie/movieSlice";
import { Button } from '@material-tailwind/react';
import {Dropdown} from "flowbite-react";


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



    return (
        <>
            <div className="relative" style={{ }}>
                <br />
                <h2 className="text-4xl font-family text-center text-6xl py-1">Search movies</h2>
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
                <br />
                <div className="text-center">
                    <Button style={{backgroundColor: 'teal'}} variant="primary" className="mr-2">
                        <Link to="/ongoing" className="button-link">Ongoing</Link>
                    </Button>
                    <Button style={{backgroundColor: 'teal'}} variant="primary">
                        <Link to="/comingSoon" className="button-link">ComingSoon</Link>
                    </Button>
                </div>
                <div className="text-center" style={{  }}>
                <Swiper
                    spaceBetween={40}
                    slidesPerView={3}
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
            </div>
        </>
    );
};