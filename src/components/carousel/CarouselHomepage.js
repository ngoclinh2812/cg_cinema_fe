import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/swiper.min.css';
import banner from '../../asset/images/thor-movies-poster.jpg'

const CarouselHomepage = () => {
    return (
        <div className='mb-4' >
            <Swiper
                spaceBetween={30}
                effect={"fade"}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper top-0"
            >

                <SwiperSlide>
                    <img
                        src={banner}
                        alt=""
                        className="mx-auto w-full  object-cover"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={banner}
                        alt=""
                        className="mx-auto w-full h-fit  object-cover"
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={banner}
                        alt=""
                        className="mx-auto w-full h-fit  object-cover"
                    />
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default CarouselHomepage;
