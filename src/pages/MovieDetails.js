import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails, selectLoading, selectMovieDetails, selectError } from '../features/movie/movieSlice';
// import { fetchMovieDetails, selectLoading, selectMovieDetails, selectError } from '../components/movie/movieDetailsSlice';

const MovieDetails = ({ id }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const movieDetails = useSelector(selectMovieDetails);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h4>{movieDetails?.title}</h4>
      <p>ID: {movieDetails?.id}</p>
      <p>Rating: {movieDetails?.rating}</p>
    </div>
  );
};

export default MovieDetails;
