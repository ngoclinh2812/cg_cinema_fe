import React from 'react';
import CarouselHomepage from "../components/carousel/CarouselHomepage";
import { MovieSlider } from "../components/carousel/MovieSlider";
import SearchBar from "../components/SearchBar";

const Homepage = () => {
    return (
        <>
            <CarouselHomepage />
            <SearchBar />
            <MovieSlider />
        </>
    );
};

export default Homepage;
