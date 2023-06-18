import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/swiper.min.css';
import {
    fetchOngoingMovies,
    selectOngoingMovies,
} from '../../features/movie/movieSlice';
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import '../../css/CarouselHomepage.css';

const CarouselHomepage = () => {
    const dispatch = useDispatch();
    const ongoingMovies = useSelector(selectOngoingMovies);

    useEffect(() => {
        dispatch(fetchOngoingMovies());
    }, [dispatch]);

    const swiperProps = {
        spaceBetween: 30,
        effect: 'fade',
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        pagination: {
            clickable: true,
        },
        navigation: true,
        modules: [Autoplay, Pagination, Navigation],
        className: 'mySwiper top-0',
    };

    const getSlideStyle = () => {
        return {
            position: 'relative',
            height: '600px',
        };
    };

    const getOverlayStyle = () => {
        return {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0))',
        };
    };

    const getContainerStyle = () => {
        return {
            position: 'absolute',
            top: '50%',
            left: '80px', // Adjust the left positioning according to your preference
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            color: '#fff',
            width: '50%',
            padding: '20px',
        };
    };

    const getTitleStyle = () => {
        return {
            fontSize: '32px', // Increase the font size
            fontWeight: 'bold',
            fontFamily: 'serif', // Set the font family to serif
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
            marginBottom: '10px',
        };
    };

    const getDescriptionStyle = () => {
        return {
            fontSize: '16px',
            marginBottom: '20px',
        };
    };

    return (
        <div className="mb-4">
            <Swiper {...swiperProps}>
                {ongoingMovies.map((movie) => (
                    <SwiperSlide key={movie.id} style={getSlideStyle()}>
                        <div style={getOverlayStyle()} />
                        <div className="image-container">
                            <img
                                src={movie.imageUrl}
                                alt={movie.name}
                                className="mx-auto w-full object-cover"
                            />
                        </div>
                        <div style={getContainerStyle()}>
                            <h2 style={getTitleStyle()}>{movie.name}</h2>
                            <p style={getDescriptionStyle()}>{movie.description}</p>
                            <Link to={`/movies/${movie.id}`}>
                                <Button color="teal" ripple="light" rounded={true} size="lg">
                                    View Details
                                </Button>
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CarouselHomepage;