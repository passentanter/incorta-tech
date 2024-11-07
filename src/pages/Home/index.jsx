import React from "react";
import SeasonList from "../Season";

// Assets
import landingImage from "../../assets/landImg.jpeg";

const Home = () => {
  return (
    <div className="relative">
      <img className="w-full h-screen" src={landingImage} akt="landingImage" />
      <SeasonList />
    </div>
  );
};

export default Home;
