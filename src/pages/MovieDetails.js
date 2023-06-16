import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails, selectLoading, selectMovieDetails, selectError } from '../features/movie/movieSlice';
import {useParams} from "react-router-dom";

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
    <div>
      <h4>{movieDetails?.name}</h4>
      <p>ID: {movieDetails?.description}</p>
      <p>Mô tả: {movieDetails?.description}</p>
      <p>Ngày khởi chiếu: {movieDetails?.dateStart}</p>
      <img src={movieDetails?.img} />
    </div>
  );
};

export default MovieDetails;
