import React, { useEffect, useState } from "react";
import { TabPanel } from "@material-tailwind/react";
import {
  getTheaters,
  selectSuccess,
  selectTheater,
  selectTheaterList,
} from "../../features/theater/theaterSlice";
import { useDispatch, useSelector } from "react-redux";
import "../../asset/styles/theater.css";
import axios from "axios";
import AgeRestriction from "./AgeRestriction";
import { Link } from "react-router-dom";
import { setScheduleMovie } from "../../features/ticket/ticketSlice";
import {setMovieDetails} from "../../features/movie/movieSlice";

  export default function TheaterSchedule(props) {
    const [theaters, setTheaters] = useState([]);
    const dispatch = useDispatch();
    const theaterList = useSelector(selectTheaterList);
    const success = useSelector(selectSuccess);
    const [theaterDt, setTheaterDt] = useState([]);
    const theaterDetail = useSelector(selectTheater);
    const [movie, setMovie] = useState({});

    const { theaterId } = props;

    const getTheaterList = async () => {
      if (!success) {
        await dispatch(getTheaters());
      } else {
        setTheaters(theaterList);
      }
    };

    useEffect(() => {
      getTheaterList();
      if (theaterId) {
        getTheaterDetail(theaterId);
      }
    }, [success, theaterList, theaterId, theaterDetail]);

    const getTheaterDetail = async (theaterId) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/theaters/${theaterId}`);
        setTheaterDt(response.data);
      } catch (error) {
        console.log("Find theater API error: " + error);
      }
    };

    let previousMovie = "";

    function handleSaveMovie(movieName, movieId) {
      dispatch(setMovieDetails({ id: movieId, name: movieName }));
      console.log(movieId);
      console.log(movieName)
    }

    return (
        <>
          {theaters &&
              theaterDt &&
              theaters.map((theater, theaterId) => (
                  <TabPanel key={theaterId} value={theater.name}>
                    <div className="theater-body">
                      <h1>{theater.name}</h1>
                      <p>{theater.address}</p>
                      <AgeRestriction />
                      <div className="theater-list">
                        {theaterDt.map((theater, index) => {
                          const currentMovie = theater.movie_name;
                          const shouldDisplayMovieName = currentMovie !== previousMovie;
                          previousMovie = currentMovie;
                          return (
                              <div className="theater-item" key={index}>
                                {shouldDisplayMovieName && (
                                    <div className="movie-info">
                                      <div className="movie-name">{currentMovie}</div>
                                    </div>
                                )}
                                <div className="show-room">
                                  <div className="show-room-info">
                                    <Link
                                        to={`/theatre/room/${theater.room_id}`}
                                        onClick={() =>
                                            dispatch(
                                                setScheduleMovie({
                                                  room: { id: theater.room_id },
                                                  movie: { id: theater.movie_id},
                                                  schedule: { id: theater.schedule_id },
                                                })
                                            )
                                        }
                                    >
                                      <button onClick={() =>
                                          handleSaveMovie(theater.movie_name, theater.movie_id)
                                      }>
                                        <div className="show-time">
                                          {theater.show_time}
                                        </div>
                                        <hr className="divider" />
                                        <div className="room-info">
                                          <div className="room-name">
                                            {theater.room_name}
                                          </div>
                                        </div>
                                      </button>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                          );
                        })}
                      </div>
                    </div>
                  </TabPanel>
              ))}
        </>
    );
  }
