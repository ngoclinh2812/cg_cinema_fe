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
import axios from "axios";
import AgeRestriction from "./AgeRestriction";


const TheatreListTab = () => {
    const [activeTab, setActiveTab] = React.useState("Theater 1");
    const [theaters, setTheaters] = useState([]);
    const dispatch = useDispatch();
    const theaterList = useSelector(selectTheaterList);
    const success = useSelector(selectSuccess);
    const [theaterId, setTheaterId] = useState(1);
    const [theaterDt, setTheaterDt] = useState([]);
    const theaterDetail = useSelector(selectTheater);

    const getTheaterList = async () => {
        if (!success) {
            await dispatch(getTheaters());
        } else {
            setTheaters(theaterList);
        }
    };



    useEffect(() => {
        getTheaterList();
        if (theaterId){
            getTheaterDetail(theaterId);
        }
    }, [success, theaterList, theaterId, theaterDetail]);

    const getTheaterDetail = async (theaterId) => {

        let result = null;
        try {
            result = await axios.get(`http://localhost:8080/api/theaters/${theaterId}`);
            setTheaterDt(result.data);
        } catch (e) {
            console.log("Find theater API error: " + e)
        }
    }



    console.log("TheaterDt: ", theaterDt)

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
                        {theaters && theaterDt &&  theaters.map((theater, theaterId) => (
                            <TabPanel key={theaterId} value={theater.name}>
                                <div className={"theater-body"}>
                                    <h1>
                                        {theater.name}
                                    </h1>
                                    <p>
                                        {theater.address}
                                    </p>
                                    <AgeRestriction/>
                                    <div className="theater-list">
                                        {theaterDt.map((theater, index) => (
                                            <div className="theater-item" key={index}>
                                                <div className="movie-info">
                                                    <div className="movie-name">{theater.movie_name}</div>
                                                    <div className="show-room">
                                                        <div className="show-room-info">
                                                            <div className="show-time">{theater.show_time}</div>
                                                            <hr className="divider"/>
                                                            <div className="room-info">
                                                                <div className="room-name">{theater.room_name}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>


                                </div>
                            </TabPanel>
                        ))}
                </TabsBody>
            </Tabs>
        </div>
    );
};

export default TheatreListTab;