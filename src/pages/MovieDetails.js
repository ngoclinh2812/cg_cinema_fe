import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails, selectLoading, selectMovieDetails, selectError } from '../features/movie/movieSlice';
import { useParams } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

const MovieDetails = () => {
    const { movieId } = useParams();
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const movieDetails = useSelector(selectMovieDetails);
    const error = useSelector(selectError);
    const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

    useEffect(() => {
        dispatch(fetchMovieDetails(movieId));
    }, [dispatch, movieId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center">
                <div className="aspect-w-16 aspect-h-9 w-full">
                    <iframe
                        title="Movie Trailer"
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${movieDetails?.trailer}`}
                        allowFullScreen
                    />
                </div>
                <div className="max-w-3xl bg-white p-8 rounded-lg shadow-md mt-6">
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-3/5 md:pl-8">
                            <img src={movieDetails?.imageUrl} alt="Movie Poster" /><br />
                            <h4 className="text-3xl font-bold mb-4">{movieDetails?.name}</h4>
                            <p className="text-gray-600 text-lg mb-4"><strong>Mô tả: </strong>{movieDetails?.description}</p>
                            <p className="text-gray-600 text-lg mb-4"><strong>Thể loại: </strong>{movieDetails?.genre}</p>
                            <p className="text-gray-600 text-lg mb-4">
                                <strong>Ngày khởi chiếu: </strong>  {movieDetails?.dateStart && movieDetails?.dateStart.slice(0, 10)}
                            </p>
                            <Button color="teal" ripple="light">
                                Buy Ticket
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
