import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails, selectLoading, selectMovieDetails, selectError } from '../features/movie/movieSlice';
import {useParams} from "react-router-dom";
import {Button} from "@material-tailwind/react";

const MovieDetails = () => {
    const { movieId } = useParams();
    const movieIdAsLong = parseInt(movieId, 10);
    const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const movieDetails = useSelector(selectMovieDetails);
  const error = useSelector(selectError);

    useEffect(() => {
      dispatch(fetchMovieDetails(movieId));
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

    console.log("MovieId: " + movieId);
    console.log(movieDetails);
  return (
      <div className="flex justify-center items-center h-screen">
          <div className="max-w-3xl bg-white p-8 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-2/5">
                      <div className="aspect-w-16 aspect-h-9">
                          <iframe
                              title="Movie Trailer"
                              className="w-full h-full"
                              src={movieDetails?.trailer}
                              allowFullScreen
                          />
                      </div>
                  </div>
                  <div className="w-full md:w-3/5 mt-6 md:mt-0 md:pl-8">
                      <h4 className="text-3xl font-bold mb-4">{movieDetails?.name}</h4>
                      <p className="text-gray-600 text-lg mb-4">ID: {movieDetails?.id}</p>
                      <p className="text-gray-600 text-lg mb-4">Mô tả: {movieDetails?.description}</p>
                      <p className="text-gray-600 text-lg mb-4">Ngày khởi chiếu: {movieDetails?.dateStart}</p>
                      <Button color="teal" ripple="light">
                          Buy Ticket
                      </Button>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default MovieDetails;
