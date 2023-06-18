import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Card, CardBody, Button, Table } from '@material-tailwind/react';
import {useEffect} from "react";
import {getUserProfile} from "../features/userSlice";
import {useNavigate} from "react-router-dom";

export const OrderConfirm = () => {
    const dispatch = useDispatch();
    const ticket = useSelector((state) => state.ticket.ticket);
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    useEffect(() => {
        // dispatch();
        dispatch(getUserProfile());
    }, [dispatch]);

    return (
        <div className="flex justify-center" style={{marginBottom: '50px'}}>
            <Card>
                <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>Order Ticket Information</h1>
                <CardBody>
                    <div className="table-container">
                        <table className="info-table">
                            <thead>
                            <tr>
                                <th colSpan="2">User Information</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Name:</td>
                                <td>{user?.lastName} {user?.firstName}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{user?.email}</td>
                            </tr>
                            </tbody>
                        </table>

                        <table className="info-table">
                            <thead>
                            <tr>
                                <th colSpan="2">Ticket Information</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Movie:</td>
                                <td>{ticket.scheduleMovie.movie.name}</td>
                            </tr>
                            <tr>
                                <td>Room:</td>
                                <td>{ticket.scheduleMovie.room.name}</td>
                            </tr>
                            <tr>
                                <td>Schedule:</td>
                                <td>{ticket.scheduleMovie.schedule.time}</td>
                            </tr>
                            <tr>
                                <td>Seat:</td>
                                <td>{ticket.seat.name}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </CardBody>
                <Button color="blue" ripple="light" onClick={(e) => navigate('/order-completed')}>
                    Confirm
                </Button>
            </Card>
        </div>
    );
};
