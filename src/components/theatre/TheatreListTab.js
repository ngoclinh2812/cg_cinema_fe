import React, { useEffect, useState } from "react";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import {
  getTheater,
  getTheaters,
  selectSuccess,
  selectTheater,
  selectTheaterList,
  setSuccess,
} from "../../features/theater/theaterSlice";
import { useDispatch, useSelector } from "react-redux";
import "../../asset/styles/theater.css";
import { Link } from "react-router-dom";
import axios from "axios";
import AgeRestriction from "./AgeRestriction";
import { Room } from "./Room";
import TheaterSchedule from "./TheaterSchedule";

const TheatreListTab = () => {
  const [activeTab, setActiveTab] = React.useState("Theater 1");
  const [theaters, setTheaters] = useState([]);
  const dispatch = useDispatch();
  const theaterList = useSelector(selectTheaterList);
  const success = useSelector(selectSuccess);
  const [theaterId, setTheaterId] = useState(1);

  const getTheaterList = async () => {
    if (!success) {
      await dispatch(getTheaters());
    } else {
      setTheaters(theaterList);
    }
  };
  
  useEffect(() => {
    getTheaterList();
  }, [success, theaterList]);

  return (
    <div className="">
      <Tabs value={activeTab}>
        <TabsHeader
          className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
          indicatorProps={{
            className:
              "bg-transparent border-b-2 border-blue-500 shadow-none rounded-none",
          }}
        >
          {theaters &&
            theaters.map((theater, index) => (
              <Tab
                key={index}
                value={theater.name}
                onClick={() => (
                  setActiveTab(theater.name), setTheaterId(theater.id)
                )}
                className={activeTab === theater.name ? "text-blue-500" : ""}
              >
                {theater.name}
              </Tab>
            ))}
        </TabsHeader>
        <TabsBody>
            <TheaterSchedule theaterId = {theaterId} />
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default TheatreListTab;
