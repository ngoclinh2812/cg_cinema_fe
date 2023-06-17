import React from 'react';
import CarouselHomepage from "../components/carousel/CarouselHomepage";
import { MovieSlider } from "../components/carousel/MovieSlider";
import Advertisement from "../components/advertisement/Advertisement";

const Homepage = () => {
    return (
        <>
            <CarouselHomepage />
            <MovieSlider />
            <Advertisement />
        </>
    );
};

export default Homepage;
