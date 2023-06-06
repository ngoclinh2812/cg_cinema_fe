import React from 'react';
import CarouselMain from "../components/carousel/CarouselMain";
import {MovieSlider} from "../components/carousel/MovieSlider";
import SearchBar from "../components/SearchBar";

const Homepage = () => {

    return (
        <>
            <CarouselMain className='my-10'/>
            <SearchBar/>
            <MovieSlider/>
        </>
    );
};

export default Homepage;