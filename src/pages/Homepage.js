import React from 'react';
import { MovieSlider } from "../components/carousel/MovieSlider";
import Advertisement from "../components/advertisement/Advertisement";
import CarouselHomepage from "../components/carousel/CarouselHomepage";

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
