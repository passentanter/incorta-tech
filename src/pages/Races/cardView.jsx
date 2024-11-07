import React from "react";
import { Link } from "react-router-dom";

import moment from "moment";
import { useAppContext } from "../../contexts/AppContext";

const CardView = ({ race, season }) => {
  const { state, dispatch } = useAppContext();

  const isRacePinned = (name) => {
    return state.pinnedRaces.some((race) => race.raceName === name);
  };

  const handlePinRace = (race) => {
    isRacePinned(race.raceName)
      ? dispatch({ type: "UNPIN_RACE", payload: race.raceName })
      : dispatch({ type: "PIN_RACE", payload: race });
  };

  return (
    <>
      <div className="flex gap-1 items-center  p-4 text-[#111827]">
        <i
          className="pi pi-flag-fill"
          style={{ color: "", fontStyle: "italic" }}
        ></i>
        <h2 className="text-xl font-bold">{race.raceName}</h2>
        <i
          onClick={() => handlePinRace(race)}
          className="pi pi-heart-fill"
          style={{
            color: isRacePinned(race.raceName) ? "red" : "gray",
            marginLeft: "auto",
            cursor: "pointer",
          }}
        ></i>
      </div>
      <hr />
      <div className="p-4 ">
        <div className="flex gap-2">
          <p className="text-[#FF1E00] font-semibold	">Circuit Name:</p>{" "}
          {race.Circuit.circuitName}{" "}
        </div>
        <div className="flex gap-2">
          <p className="text-[#FF1E00] font-semibold">Date:</p>
          <p className=" font-font-medium	">
            {moment(race.date).format("MMMM DD, YYYY")}
          </p>
        </div>
      </div>
      <Link
        className="m-auto mb-4 text-[#0284c7] underline-offset-1"
        to={`/season/${season}/race/${race.round}`}
      >
        show details
      </Link>
    </>
  );
};

export default CardView;
