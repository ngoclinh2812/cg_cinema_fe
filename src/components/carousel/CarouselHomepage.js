import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/swiper.min.css';
// import banner from '../../asset/images/thor-movies-poster.jpg'
import banner1 from '../../asset/images/tamvedinhmenh.png'
import banner2 from '../../asset/images/interstellar-banner.jpg'
import banner3 from '../../asset/images/spiderman.jpg'


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

                <SwiperSlide style={{ height: '600px' }}>
                    <img
                        src={banner1}
                        alt=""
                        className="mx-auto w-full  object-cover"
                    />
                </SwiperSlide>
                <SwiperSlide style={{ height: '600px' }}>
                    <img
                        src={banner2}
                        alt=""
                        className="mx-auto w-full  object-cover"
                    />
                </SwiperSlide>
                <SwiperSlide style={{ height: '600px' }}>
                    <img
                        src={banner3}
                        alt=""
                        className="mx-auto w-full object-cover"
                    />
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default CarouselHomepage;
