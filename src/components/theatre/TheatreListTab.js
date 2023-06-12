import React, {useEffect, useState} from 'react';
import {Tabs, Tab, TabPanel, TabsBody, TabsHeader} from "@material-tailwind/react";
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


const TheatreListTab = () => {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = React.useState("html");
    const [theaters, setTheaters] = useState([]);
    const dispatch = useDispatch();
    const theaterList = useSelector(selectTheaterList);
    const success = useSelector(selectSuccess);
    const [theaterId, setTheaterId] = useState();
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
    }, [success, theaterList]);


    useEffect(() =>{
        setLoading(true)
    }, [theaters])

    useEffect(() => {
        getTheaterDetail(theaterId);
    }, [theaterId])

    const getTheaterDetail = async (theaterId) => {
        if (success) {
           await dispatch(getTheater(theaterId))
            setTheaterDt(theaterDetail)
        } else {
            setTheaterDt(theaterDetail)
            dispatch(setSuccess(true))
        }
    }


    return (
        <div className="">
            <Tabs value={activeTab}>
                <TabsHeader
                    className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                    indicatorProps={{
                        className: "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none",
                    }}
                >
                    {theaters !== null ? <>
                        {theaters.map((theater) => (
                            <Tab
                                key={theater.id}
                                value={theater.name}
                                onClick={() => (setActiveTab(theater.name), setTheaterId(theater.id))
                                }
                                className={activeTab === theater.name ? "text-blue-500" : ""}
                            >
                                {theater.name}
                            </Tab>
                        ))}
                    </> : <p>Something went wrong</p>}

                </TabsHeader>
                <TabsBody>
                    {theaters !== null ? <>
                        {theaters.map((theater) => (
                            <TabPanel key={theater.id} value={theater.name}>
                                {theaterDt !== null ? <div className={"theater-body"}>
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

                                    {theaterDt.map((theater) => (
                                        <div>
                                            {theater.movie_name}
                                            {theater.show_time}
                                        </div>
                                    ))}
                                </div> : <p>Ban chua chon rap</p>}

                            </TabPanel>
                        ))}
                    </> : <p>Something went wrong</p>}
                </TabsBody>
            </Tabs>

        </div>
    );
};

export default TheatreListTab;