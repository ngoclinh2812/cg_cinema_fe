import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getUserProfile} from "../features/userSlice";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";

const Profile = () => {
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.user.user);
    const loading = useSelector((state) => state.user.loading);

    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);

    if (loading) {
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
                    <CardHeader color="blue" className="mb-0">
                        <h4 color="blue">{`${firstName} ${lastName}`}</h4>
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
        </>

    );
};

export default Profile;
