import React from 'react';
import CarouselHomepage from "../components/carousel/CarouselHomepage";
import { MovieSlider } from "../components/carousel/MovieSlider";
import Advertisement from "../components/advertisement/Advertisement";
import {OnGoingSlider} from "../components/carousel/OnGoingSlider";


const Homepage = () => {
    return (
        <>
            <CarouselHomepage />
            <MovieSlider />
            <OnGoingSlider/>
            <Advertisement />
        </>
    );
};

export default Homepage;
