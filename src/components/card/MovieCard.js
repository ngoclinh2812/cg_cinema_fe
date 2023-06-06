import React from 'react';
import { Card, Button } from 'flowbite-react';

const MovieCard = ({ title, image, genre, duration }) => {
    return (
        <Card>
            <div style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', height: '200px' }} />
            <div>
                <h2>{title}</h2>
                <p>{genre}</p>
                <p>Duration: {duration}</p>
            </div>
            <Button>Watch Now</Button>
        </Card>
    );
};

export default MovieCard;
