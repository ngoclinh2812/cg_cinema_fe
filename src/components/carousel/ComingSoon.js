import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/css/navigation";
import MovieCard from "../card/MovieCard";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {fetchComingSoonMovies, setSuccess} from "../../features/movie/movieSlice";

export const ComingSoon = () => {
    const comingSoon = useSelector((state) => state.movie.comingSoonMovies);
    const success = useSelector((state) => state.movie.success);
    const dispatch = useDispatch();

    useEffect(() => {
        const getMovieList = async () => {
            if (!success) {
                dispatch(fetchComingSoonMovies());
            } else {
                dispatch(setSuccess(true));
            }
        };

        getMovieList();
    }, [dispatch, success]);

    return (
        <>
            <div className="text-center"  style={{ }}>
                <h1 className="font-family text-6xl py-1">ComingSoon Movie</h1>
                <Swiper
                    spaceBetween={40}
                    slidesPerView={5}
                    onSlideChange={() => console.log("slide change")}
                    onSwiper={(swiper) => console.log(swiper)}
                    className="my-6 mx-auto"
                >
                    {comingSoon.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <Link to={`/movies/${movie.id}`} >
                                <MovieCard
                                    title={
                                        movie.name.length > 10
                                            ? `${movie.name.substring(10, 15)}...`
                                            : movie.name
                                    }
                                    img={movie.img}
                                    id={movie.id}
                                />
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </>
    );
};
