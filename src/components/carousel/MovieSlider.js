import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/css/navigation";
import MovieCard from "../card/MovieCard";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
    getMovies,
    selectMovieList,
    setSuccess,
} from "../../components/movie/movieSlice";

export const MovieSlider = () => {
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const movieList = useSelector(selectMovieList);
    const success = useSelector((state) => state.movie.success);
    const dispatch = useDispatch();

    useEffect(() => {
        const getMovieList = async () => {
            if (!success) {
                dispatch(getMovies());
            } else {
                dispatch(setSuccess(true));
            }
        };

        getMovieList();
    }, [success]);

    const handleSearch = () => {
        const results = movieList.filter((movie) =>
            movie.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setSearchResults(results);
    };

    return (
        <>
            <div className="font-semibold text-4xl mx-auto">Featured Movie</div>
            <div className="relative">
                <div className="flex justify-center mt-4">
                    <input
                        type="text"
                        placeholder="Search Movie"
                        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button
                        type="button"
                        className="px-4 py-2 ml-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
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
                                <MovieCard title={movie.name} imageUrl={movie.img} />
                            </SwiperSlide>
                        )
                    )}
                </Swiper>
            </div>
        </>
    );
};
