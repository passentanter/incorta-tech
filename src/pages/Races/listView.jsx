import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";

const ListView = ({ race, season }) => {
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
    <Link to={`/season/${season}/race/${race.round}`}>
      <div className="w-full flex gap-1 items-center p-4 text-[#111827]">
        <div className="flex flex-col items-center">
          <p className=" font-semibold	">{moment(race.date).format("DD")}</p>
          <p className=" font-font-medium bg-[#EDEDED] rounded-xl px-4 ">
            {moment(race.date).format("MMMM")}
          </p>
          <p className=" font-font-medium text-[#FF1E0A]	">
            {moment(race.date).format("YYYY")}
          </p>
        </div>
        <div className="border-l-2 border-dotted flex flex-col gap-1 pl-8 ml-8 ">
          <p className="font-extrabold">{race.raceName}</p>
          <div className="flex items-center gap-2">
            <i
              className="pi pi-flag-fill"
              style={{ color: "", fontStyle: "italic" }}
            ></i>
            <p> {race.Circuit.circuitName}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 ml-auto ">
          <i
            onClick={() => handlePinRace(race)}
            className="pi pi-heart-fill"
            style={{
              color: isRacePinned(race.raceName) ? "red" : "gray",
              marginLeft: "auto",
              cursor: "pointer",
              fontSize: "1.5rem",
            }}
          ></i>
        </div>
      </div>
    </Link>
  );
};

export default ListView;
