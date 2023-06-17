import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getUserProfile} from "../features/userSlice";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import {selectTickets, getTickets} from "../features/ticket/ticketSlice";

const Profile = () => {
    const dispatch = useDispatch();

    const userProfile = useSelector((state) => state.user.user);
    const userLoading = useSelector((state) => state.user.loading);
    const userError = useSelector((state) => state.user.error);

    const ticketList = useSelector(selectTickets);
    const ticketLoading = useSelector((state) => state.ticket.loading);
    const ticketError = useSelector((state) => state.ticket.error);


    useEffect(() => {
        dispatch(getUserProfile());
        dispatch(getTickets());
    }, [dispatch]);
    ;

    if (userLoading || ticketLoading) {
        return <div>Loading...</div>;
    }

    if (!userProfile) {
        return <div>Error loading user profile</div>;
    }


    const { firstName, lastName, username, phone, email, image } = userProfile;

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <Card>
                    <CardHeader text="blue" className="mb-0">
                        <h4>{`${firstName} ${lastName}`}</h4>
                    </CardHeader>
                    <CardBody>
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-3/5 md:pl-8">
                                <p>
                                    <strong>Username:</strong> {username}
                                </p>
                                <p>
                                    <strong>Phone:</strong> {phone}
                                </p>
                                <p>
                                    <strong>Email:</strong> {email}
                                </p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div>
                <h1>Ticket List</h1>
                <table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Movie name</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ticketList.map((ticket) => (
                        <tr key={ticket.id}>
                            <td>Ticket ID: {ticket.id}</td>
                            <td>Ticket Name: {ticket.show_date}</td>
                            <td>Ticket Name: {ticket.show_time}</td>
                            <td>Ticket Name: {ticket.movie_name}</td>
                            <td>Price: {ticket.movie_name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>

    );
};

export default Profile;
