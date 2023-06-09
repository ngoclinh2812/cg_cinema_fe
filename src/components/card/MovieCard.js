import React from "react";
import '../../asset/styles/movieCard.css'
import {Link} from "react-router-dom";
import {Button} from "flowbite-react";
import {IoTicketOutline} from "react-icons/io5";
import {MdOutlineLocalMovies} from "react-icons/md";

const MovieCard = ({ name, img }) => {// thiếu csdl thoi gian chieu
    let bgColor = '';
    // switch (rating){
    //     case 'PG':
    //         bgColor = 'bg-yellow-400';
    //         break;
    //     case 'G':
    //         bgColor = 'bg-green-400';
    //         break;
    //     case '13':
    //         bgColor = 'bg-purple-400';
    //         break;
    //     case '18':
    //         bgColor = 'bg-red-400';
    //         break;
    // }

    return (
        <div className="bg-white shadow-lg border-gray-100 max-h-80 border sm:rounded-3xl p-8 flex space-x-8 mb-10">
            <div className="h-48 w-1/2 overflow-visible">
                <img
                    className="rounded-3xl shadow-lg h-full w-full object-cover"
                    src={img}
                    alt={`${name} + banner`}
                />
            </div>
            <div className="flex flex-col w-1/2 space-y-4">
                <div className="flex justify-between items-start">
                    <h2 className="text-3xl font-bold">{name}</h2>
                    {/*<div className={`font - bold rounded-xl p-2 ${bgColor}`} >{rating}</div>*/}
                </div>

                {/*<div className='flex items-center'>*/}
                {/*    <div className="text-lg text-gray-400 mr-4">Genre:</div>*/}
                {/*    <div className="text-xl text-gray-800">{genre}</div>*/}
                {/*</div>*/}
                {/*<div className='flex items-center'>*/}
                {/*    <div className="text-lg text-gray-400 mr-4">Duration</div>*/}
                {/*    <div className="text-xl text-gray-800">{duration}</div>*/}
                {/*</div>*/}

                <div className="flex text-2xl font-bold text-a">
                    <Link to='/'>
                        <Button className='mr-4'>
                            <IoTicketOutline className='text-lg mr-2'/> Tickets
                        </Button>
                    </Link>
                    <Link to='/'>
                        <Button className='mr-4'>
                            <MdOutlineLocalMovies className='text-lg mr-2'/> Details
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;