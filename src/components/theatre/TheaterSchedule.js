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
import { setMovieDetails } from "../../features/movie/movieSlice";

export default function TheaterSchedule(props) {
  const [theaters, setTheaters] = useState([]);
  const dispatch = useDispatch();
  const theaterList = useSelector(selectTheaterList);
  const success = useSelector(selectSuccess);
  const [theaterDt, setTheaterDt] = useState([]);
  const theaterDetail = useSelector(selectTheater);
  const [selectedMovie, setSelectedMovie] = useState(null);


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
      const response = await axios.get(
          `http://localhost:8080/api/theaters/${theaterId}`
      );
      setTheaterDt(response.data);
    } catch (error) {
      console.log("Find theater API error: " + error);
    }
  };

  const handleSaveMovie = (movie) => {
    setSelectedMovie(movie);
    dispatch(setMovieDetails({ id: movie.movie_id, name: movie.movie_name }));
  };




  return (
      <>
        {theaters.map((theater) => (
            <TabPanel key={theater.name} value={theater.name}>
              <div className="theater-body">
                <h1>{theater.name}</h1>
                <p>{theater.address}</p>
                <AgeRestriction />
                <div className="theater-list">
                  {theaterDt.map((schedule) => {
                    const { movie_name, show_date, show_time, movie_id, room_id } =
                        schedule;
                    const shouldDisplayMovieName =
                        !selectedMovie || selectedMovie.movie_name !== movie_name;

                    return (
                        <div className="theater-item" key={schedule.id}>
                          {shouldDisplayMovieName && (
                              <div className="movie-info">
                                <div className="movie-name">{movie_name}</div>
                              </div>
                          )}
                          <div className="show-room">
                            <div className="show-room-info">
                              <Link
                                  to={`/theatre/room/${room_id}`}
                                  onClick={() =>
                                      dispatch(
                                          setScheduleMovie({
                                            room: { id: theater.room_id },
                                            movie: { id: theater.movie_id },
                                            schedule: { id: schedule.id },
                                          })
                                      )
                                  }
                              >
                                <button
                                    onClick={() =>
                                        handleSaveMovie({
                                          movie_id,
                                          movie_name,
                                        })
                                    }
                                >
                                  <div className="show-time">{schedule.show_time}</div>
                                  <hr className="divider" />
                                  <div className="room-info">
                                    <div className="room-name">{schedule.room_name}</div>
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
