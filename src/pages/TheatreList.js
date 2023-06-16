import React from 'react';
import TheatreListTab from "../components/theatre/TheatreListTab";
import AgeRestriction from "../components/theatre/AgeRestriction";
import {TheatreListDate} from "../components/theatre/TheatreListDate";



const TheatreList = () => {
    return (
        <>

            <div className='mx-auto'>
                <img src="https://media.lottecinemavn.com/Media/WebAdmin/17770846a23d48dc8630cf8a08f8ee93.jpg" alt=""/>
                <TheatreListTab/>
            </div>
        </>
    );
};

export default TheatreList;