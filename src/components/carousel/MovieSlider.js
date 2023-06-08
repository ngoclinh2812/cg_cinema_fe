import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import MovieCard from "../card/MovieCard";
import {Button} from "flowbite-react";
import {Link} from "react-router-dom";
import {IoTicketOutline} from "react-icons/io5";
import {MdOutlineLocalMovies} from "react-icons/md";

export const MovieSlider = () => {
    return (
        <>
            <div className="font-semibold text-4xl mx-auto">Featured Movie</div>
            <div className="relative">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={3}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    className="my-6 mx-auto"
                >
                    <SwiperSlide>
                       <MovieCard title='Ten phim' duration='thoi gian chieu' genre='the loai' imageUrl='link hinh' rating='18'/>
                    </SwiperSlide>
                </Swiper>
            </div>
        </>
    );
};
