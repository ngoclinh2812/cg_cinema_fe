import { get } from "react-hook-form";
import "../../asset/styles/room.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { findRoom } from "../../api/RoomAPI";

export const Room = () => {
  // const [Seats, setListSeat] = useState([]);
  // const SeatList = useSelector(setListSeat);
  //
  // const getSeatList = async () => {
  //   if (!success) {
  //     await dispatch(getRoom());
  //   } else {
  //     setRoom(SeatList);
  //   }
  // };
  //
  // useEffect(() => {
  //   getSeatList();
  // },[SeatList]);

  return (
    <>
      <div className="wrapper">
        <div className="container">
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
          <div className="row">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
          <div className="row">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
          <div className="row">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
          <div className="row">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
          <div className="row">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
          <div className="row">
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
            <div className="seat"></div>
          </div>
          <p className="text">
            You have selected <span id="count">0</span> seat for a price of RS.
            <span id="total">0</span>
          </p>
        </div>
      </div>
    </>
  );
};
