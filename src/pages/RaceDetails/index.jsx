import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../../api/apiService";
import AnalyticsSection from "./analyticsSection";

import vrsImg from "../../assets/Sc2024-11-07 134619.png";
import loadingGif from "../../assets/da832510129901b5af57fce40d583724.gif";

const titles = {
  default: "How Quickly Formula 1’s Top Three Drivers Reached Their Milestones",
  points: "Compare between drivers in points",
  laps: "",
};

const RaceDetails = () => {
  const { season, round } = useParams();
  const [raceDetails, setRaceDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const [defaultComparisonDrivers, setDefaultComparisonDrivers] =
    useState(null);

  useEffect(() => {
    const fetchRaceDetails = async () => {
      if (!season) return;
      try {
        const data = await apiService.getRaceDetails(season, round);
        setRaceDetails(data);
        const xAxis = [];
        const yAxis = [];
        for (let index = 0; index < 3; index++) {
          const element = data[index];
          xAxis.push(element.Driver.givenName);
          yAxis.push(Number(element.Time.millis));
        }
        setDefaultComparisonDrivers({ xAxis, yAxis, title: titles.default });
      } catch (error) {
        console.error(`Failed to fetch races for season ${season}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchRaceDetails();
  }, [season, round]);

  if (loading)
    return (
      <div className="flex justify-center items-center w-full h-[80vh] ">
        <img className="w-[20vw] " src={loadingGif} alt="loading..." />
      </div>
    );

  return (
    <div className="bg-[#2B2B2B] pb-8 min-100vh ">
      <img src={vrsImg} alt="vrs" />
      <div className=" flex flex-col gap-16 w-[90%] m-auto bg-white p-8 rounded">
        <AnalyticsSection
          raceDetails={raceDetails}
          defaultComparisonDrivers={defaultComparisonDrivers || {}}
        />
      </div>
    </div>
  );
};

export default RaceDetails;
