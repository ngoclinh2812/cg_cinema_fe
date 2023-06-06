import React from "react";
import {Carousel} from "@material-tailwind/react";
import MovieCard from "../card/MovieCard";

export const MovieSlider = () => {

        return (
            <Carousel>
                <MovieCard className=""/>
            </Carousel>
        );

}