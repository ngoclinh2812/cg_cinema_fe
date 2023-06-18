import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setRoomId } from "../../features/ticket/ticketSlice";
import "../../asset/styles/room.css";
import 'bootstrap/dist/css/bootstrap.css';

export const Room = () => {
  const CG_THEATER_API = "http://localhost:8080/api";
  const { roomId } = useParams();
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const MAX_SELECTED_SEATS = 1;
  const [scrollNav, setScrollNav] = useState(false);
  const dispatch = useDispatch();

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
      const updatedSeats = selectedSeats.filter(
          (seatIndex) => seatIndex !== index
      );
      setSelectedSeats(updatedSeats);
    } else {
      if (selectedSeats.length < MAX_SELECTED_SEATS) {
        const updatedSeats = [...selectedSeats, index];
        setSelectedSeats(updatedSeats);

        const selectedRoomId = seats[index].room_id;
        dispatch(setRoomId(selectedRoomId));
      }
    }
  };

  return (
      <>
        <div className="wrapper">
          <div className="container">
            <div>
              <h1>Name Movie: </h1>
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
                      className={`col seat ${
                          selectedSeats.includes(index) ? "selected" : ""
                      } ${seat.sold ? "sold" : ""}`}
                      key={index}
                      onClick={() => handleSeatClick(index)}
                  >
                    {seat.seat_name}
                  </div>
              ))}
            </div>

            {/*<p className="text">*/}
            {/*  You have selected <span id="count">{selectedSeats.length}</span>{" "}*/}
            {/*  seat for a price of RS.*/}
            {/*  <span id="total">{selectedSeats.length * seatPrice}</span>*/}
            {/*</p>*/}
          </div>
        </div>
      </>
  );
};
