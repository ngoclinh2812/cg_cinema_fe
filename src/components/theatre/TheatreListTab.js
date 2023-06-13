import React, {useEffect, useState} from 'react';
import {Tab, TabPanel, Tabs, TabsBody, TabsHeader} from "@material-tailwind/react";
import {
    getTheater,
    getTheaters,
    selectSuccess,
    selectTheater,
    selectTheaterList,
    setSuccess
} from "../../features/theater/theaterSlice";
import {useDispatch, useSelector} from "react-redux";
import "../../asset/styles/theater.css"
import {Link} from "react-router-dom";


const TheatreListTab = () => {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = React.useState("Theater 1");
    const [theaters, setTheaters] = useState([]);
    const dispatch = useDispatch();
    const theaterList = useSelector(selectTheaterList);
    const success = useSelector(selectSuccess);
    const [theaterId, setTheaterId] = useState(1);
    const [theaterDt, setTheaterDt] = useState([]);
    const theaterDetail = useSelector(selectTheater);

    const getTheaterList = async () => {
        setLoading(true)
        if (!success) {
            await dispatch(getTheaters());
        } else {
            setTheaters(theaterList);
            dispatch(setSuccess(true));
            setLoading(false)
        }
    };

    useEffect(() => {
        getTheaterList();
        getTheaterDetail(theaterId);

    }, [success, theaterList, theaterId, theaterDetail]);


    useEffect(() =>{
        setLoading(true)
    }, [theaters])

    // useEffect(() => {
    //     if(theaterId) {
    //         getTheaterDetail(theaterId);
    //     }
    // }, [theaterId])

    const getTheaterDetail = async (theaterId) => {
        console.log('success: ',success)
        if (!success) {
            await dispatch(getTheater(theaterId))
            console.log(theaterId)
            if(theaterDetail) {
                setTheaterDt(theaterDetail)
            }
        } else {
            setTheaterDt(theaterDetail)
            dispatch(setSuccess(true))
        }
    }


    console.log('theaterId: ', theaterId)
    console.log('theaterDetail: ', theaterDetail)

    return (
        <div className="">
            <Tabs value={activeTab}>
                <TabsHeader
                    className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                    indicatorProps={{
                        className: "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none",
                    }}
                >
                    {theaters && theaters.map((theater, index) => (
                        <Tab
                            key={index}
                            value={theater.name}
                            onClick={() => (setActiveTab(theater.name), setTheaterId(theater.id))
                            }
                            className={activeTab === theater.name ? "text-blue-500" : ""}
                        >
                            {theater.name}
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody>
                        {theaters && theaterDt &&  theaters.map((theater, index) => (
                            <TabPanel key={index} value={theater.name}>
                                <div className={"theater-body"}>
                                    <h1>
                                        {theater.name}
                                    </h1>
                                    <p>
                                        {theater.address}
                                    </p>
                                    <span className={"month"}>
                                        <em>number </em>
                                        <span>month and year {theaterId}</span>
                                    </span>
                                    {theaterDt.map((theater, index) => (
                                        <div key={index}>
                                            {theater.movie_name}
                                            {theater.show_time}
                                        </div>
                                    ))}
                                </div>
                            </TabPanel>
                        ))}
                </TabsBody>
            </Tabs>
        </div>
    );
};

export default TheatreListTab;