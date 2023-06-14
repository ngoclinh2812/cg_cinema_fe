import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { selectError, selectLoading, selectMovieDetails } from '../components/movie/movieSlice';
import { fetchMovieDetails } from '../features/movie/movieSlice';
import { useParams } from 'react-router-dom';


const MovieDetails = () => {
    const { id } = useParams();
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

