import React, { createContext, useReducer, useContext } from "react";

export const AppContext = createContext();

const initialState = {
  selectedSeason: null,
  races: [],
  pinnedRaces: JSON.parse(localStorage.getItem("pinnedRaces")) || [],
  viewMode: "list", // or 'card'
  currentRoute: "/",
  raceDetails: {},
};

function appReducer(state, action) {
  switch (action.type) {
    case "SET_SELECTED_SEASON":
      return { ...state, selectedSeason: action.payload };
    case "SET_RACES":
      return { ...state, races: action.payload };
    case "PIN_RACE":
      if (!state.pinnedRaces.find((race) => race.raceName === action.payload.raceName)) {
        const updatedPinned = [...state.pinnedRaces, action.payload];
        localStorage.setItem("pinnedRaces", JSON.stringify(updatedPinned));
        return { ...state, pinnedRaces: updatedPinned };
      }
      return state;
    case "UNPIN_RACE":
      const filteredPinned = state.pinnedRaces.filter(
        (race) => race.raceName !== action.payload
      );
      localStorage.setItem("pinnedRaces", JSON.stringify(filteredPinned));
      return { ...state, pinnedRaces: filteredPinned };

    // +++++++++++++++++++++++++++++++

    // case "PIN_RACE":
    //   // Avoid duplicate pinning by checking if the race is already pinned
    //   if (!state.pinnedRaces.find((race) => race.id === action.payload.id)) {
    //     return {
    //       ...state,
    //       pinnedRaces: [...state.pinnedRaces, action.payload],
    //     };
    //   }
    //   return state;
    // case "UNPIN_RACE":
    //   return {
    //     ...state,
    //     pinnedRaces: state.pinnedRaces.filter(
    //       (race) => race.id !== action.payload
    //     ),
    //   };

    // +++++++++++++++++++++++++++++++
    case "SET_VIEW_MODE":
      return { ...state, viewMode: action.payload };
    case "SET_CURRENT_ROUTE":
      return { ...state, currentRoute: action.payload };
    case "SET_RACE_DETAILS":
      return { ...state, raceDetails: action.payload };
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
