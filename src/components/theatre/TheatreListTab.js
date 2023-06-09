import React, {useEffect, useState} from 'react';
import {Tabs,Tab, TabPanel, TabsBody, TabsHeader} from "@material-tailwind/react";
import {getTheaters, selectSuccess, selectTheaterList, setSuccess} from "../../features/theater/theaterSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const TheatreListTab = () => {
    // const [activeTab, setActiveTab] = React.useState("html");
    // const data = [
    //     {
    //         label: "Rap 1",
    //         value: "html",
    //         desc: `It really matters and then like it really doesn't matter.
    //   What matters is the people who are sparked by it. And the people
    //   who are like offended by it, it doesn't matter.`,
    //     },
    //     {
    //         label: "Rap 2",
    //         value: "react",
    //         desc: `Because it's about motivating the doers. Because I'm here
    //   to follow my dreams and inspire other people to follow their dreams, too.`,
    //     },
    //     {
    //         label: "Rap 3",
    //         value: "vue",
    //         desc: `We're not always in the position that we want to be at.
    //   We're constantly growing. We're constantly making mistakes. We're
    //   constantly trying to express ourselves and actualize our dreams.`,
    //     },
    //     {
    //         label: "Rap 4",
    //         value: "angular",
    //         desc: `Because it's about motivating the doers. Because I'm here
    //   to follow my dreams and inspire other people to follow their dreams, too.`,
    //     },
    //     {
    //         label: "Rap 5",
    //         value: "svelte",
    //         desc: `We're not always in the position that we want to be at.`,
    //     },
    // ];

    const [theaters, setTheaters] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theaterList = useSelector(selectTheaterList);
    const success = useSelector(selectSuccess);

    const getTheaterList = async () => {
        if (!success) {
            dispatch(getTheaters());
        } else {
            setTheaters(theaterList);
            dispatch(setSuccess(true));
        }
    };

    useEffect(() => {
        getTheaterList();

    }, [success])

    return (
        <div className="mt-16">
            <Tabs>
                <TabsHeader
                    className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                    indicatorProps={{
                        className: "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none",
                    }}
                >
                    {theaters.map((theater) => (
                        <Tab
                            key={theater.id}
                            value={theater.name}
                            // onClick={() => setActiveTab(value)}
                            // className={activeTab === value ? "text-blue-500" : ""}
                        >
                            {theater.name}
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody>
                    {theaters.map((theater) => (
                        <TabPanel key={theater.id} value={theater.name}>
                            {theater.name}
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
        </div>
    );
};

export default TheatreListTab;
