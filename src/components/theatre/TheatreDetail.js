import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getTheaters, selectSuccess, selectTheaterList, setSuccess} from "../../features/theater/theaterSlice";

const TheatreDetail = () => {
    const [theaters, setTheaters] = useState([]);
    const [movie, setMovie] = useState()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theaterList = useSelector(selectTheaterList);
    const success = useSelector(selectSuccess);

    const getTheaterList = async () => {
        if (!success) {
            dispatch(getTheaters());
        } else {
            setTheaters(theaterList);
            dispatch(setSuccess(true));
        }
    };

    useEffect(() => {
        getTheaterList();
        getMovieList();
    }, [success]);


    return (
        <div>
            <div>
                <span>Mọi đối tượng </span>
                <span>13 Tuổi trở lên </span>
                <span>16 tuổi trở lên </span>
                <span>18 tuổi trở lên </span>
            </div>
            <div>
                {theaters.map((theater) => (

                    <div>
                        {}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TheatreDetail;