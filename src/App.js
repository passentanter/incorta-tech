import "./App.css";
import Navbar from "./component/navbar";
import { AppProvider } from "./contexts/AppContext";
import Home from "./pages/Home";
import RaceDetails from "./pages/RaceDetails";
import RaceList from "./pages/Races";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/season/:season" element={<RaceList />} />
            <Route
              path="/season/:season/race/:round"
              element={<RaceDetails />}
            />
          </Routes>
        </Router>
      </div>
    </AppProvider>
  );
}

export default App;
