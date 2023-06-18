import {useNavigate} from "react-router-dom";
import {Button} from "@material-tailwind/react";
import React from "react";

export const OrderCompleted = () => {
    const navigate = useNavigate();

    return(
        <>
            Order completed! You may go to your profile and view your ticket details.
            <Button color="teal" ripple="light" onClick={(e) => navigate('/profile')}>
                Back to profile
            </Button>
        </>
    )
}