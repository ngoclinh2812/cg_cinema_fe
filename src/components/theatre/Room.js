import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import error from "../Error";
import {useDispatch, useSelector} from "react-redux";
import { setRoomId, setSeatId, saveTicket } from "../../features/ticket/ticketSlice";
import "../../asset/styles/room.css";
import {selectTheater} from "../../features/theater/theaterSlice";
import {selectMovieDetails} from "../../features/movie/movieSlice";

export const Room = () => {
  const CG_THEATER_API = "http://localhost:8080/api";
  const { roomId } = useParams();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const MAX_SELECTED_SEATS = 1;
  const [scrollNav, setScrollNav] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movieDetails = useSelector(selectMovieDetails);
  const { id: movieId, name: movieName } = movieDetails;
  // const seatId = useSelector(selectTicket).seat.id;

  useEffect(() => {
    axios
        .get(`${CG_THEATER_API}/room/${roomId}`)
        .then((res) => setSeats(res.data))
        .catch((err) => {
          throw err;
        });
  }, [roomId]);

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 10;
      setScrollNav(!isTop);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSeatClick = (index) => {
    if (selectedSeats.includes(index)) {
      const updatedSeats = selectedSeats.filter((seatIndex) => seatIndex !== index);
      setSelectedSeats(updatedSeats);
    } else {
      if (selectedSeats.length < MAX_SELECTED_SEATS) {
        const updatedSeats = [...selectedSeats, index];
        setSelectedSeats(updatedSeats);

        const selectedRoomId = seats[index].room_id;
        dispatch(setRoomId(selectedRoomId));

        const selectedSeatId = seats[index].id; // Add this line to get the seat id
        dispatch(setSeatId(selectedSeatId)); // Dispatch setSeatId action
      }
    }
  };


  console.log(seats)

  const handleNextButtonClick = () => {
    navigate("/order-confirm");
  };




  const renderSeats = () => {
    const rows = Math.ceil(seats.length / 8); // Calculate the number of rows based on seat count and 8 seats per row
    const seatElements = [];

    for (let i = 0; i < rows; i++) {
      const rowSeats = seats.slice(i * 8, (i + 1) * 8); // Get 8 seats for each row

      const row = rowSeats.map((seat, index) => (
          <div
              className={`seat ${
                  selectedSeats.includes(i * 8 + index) ? "selected" : ""
              } ${seat.sold ? "sold" : ""}`}
              key={i * 8 + index}
              onClick={() => handleSeatClick(i * 8 + index)}
              style={{
                display: "inline-block",
                margin: "5px", // Adjust the margin to increase space between seats
              }}
          >
            {seat.seat_name}
          </div>
      ));

      seatElements.push(
          <div className="row" key={i}>
            {row}
          </div>
      );
    }

    return seatElements;
  };

  return (
      <>
        <div className="wrapper">
          <div className="container">
            <div>
              <h1>Movie name: {movieName}</h1><br />
            </div>
            <ul className="showcase">
              <li>
                <div className="seat"></div>
                <small>Available</small>
              </li>
              <li>
                <div className="seat selected"></div>
                <small>Selected</small>
              </li>
              <li>
                <div className="seat sold"></div>
                <small>Sold</small>
              </li>
            </ul>
            <div className="screen"></div>
            <div className="row row-cols-xxl-6">
              {seats.map((seat, index) => (
                  <div
                      className={`col seat ${selectedSeats.includes(index) ? 'selected' : ''} ${seat.sold ? 'sold' : ''}`}
                      key={index}
                      onClick={() => handleSeatClick(index)}
                  >
                    {seat.seat_name}
                  </div>
              ))}
            </div>
            <br />
            <button
                className="btn btn-primary next-button"
                onClick={handleNextButtonClick}
                disabled={selectedSeats.length === 0}
                style={{backgroundColor: 'teal', color: 'white'}}
            >
              Next
            </button>
          </div>
        </div>
      </>
  );
};