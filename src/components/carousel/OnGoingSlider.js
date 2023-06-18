import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/css/navigation";
import MovieCard from "../card/MovieCard";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOngoingMovies, setSuccess } from "../../features/movie/movieSlice";

export const OnGoingSlider = () => {
    const ongoingMovies = useSelector((state) => state.movie.ongoingMovies);
    const success = useSelector((state) => state.movie.success);
    const dispatch = useDispatch();

    useEffect(() => {
        const getMovieList = async () => {
            if (!success) {
                dispatch(fetchOngoingMovies());
            } else {
                dispatch(setSuccess(true));
            }
        };

        getMovieList();
    }, [dispatch, success]);

    return (
        <>
            <div className="text-center" style={{ backgroundColor: "rgb(250, 250, 154)" }}>
                <h1 className="font-family text-6xl py-1">OnGoing Movie</h1>
                <Swiper
                    spaceBetween={40}
                    slidesPerView={3}
                    onSlideChange={() => console.log("slide change")}
                    onSwiper={(swiper) => console.log(swiper)}
                    className="my-6 mx-auto"
                >
                    {ongoingMovies.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <Link to={`/movies/${movie.id}`}>
                                <MovieCard
                                    title={
                                        movie.name.length > 20
                                            ? `${movie.name.substring(0, 15)}...`
                                            : movie.name
                                    }
                                    imageUrl={movie.img}
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
