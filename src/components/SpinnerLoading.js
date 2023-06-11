import React from 'react';
import {Spinner} from "@material-tailwind/react";

const SpinnerLoading = () => {
    return (
        <div className='my-auto mx-auto'>
            <Spinner className="h-12 w-12" />
        </div>
    );
};

export default SpinnerLoading;