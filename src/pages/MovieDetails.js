import React from 'react';
import { Card, CardBody, CardImage, CardTitle, CardText } from '@material-tailwind/react';

const MovieDetails = ({ id, title, imageUrl, rating }) => {
    return (
        <Card>
            <CardImage src={imageUrl} alt={title} />
            <CardBody>
                <CardTitle>{title}</CardTitle>
                <CardText>ID: {id}</CardText>
                <CardText>Rating: {rating}</CardText>
            </CardBody>
        </Card>
    );
};

export default MovieDetails;

