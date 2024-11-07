const BASE_URL = "https://ergast.com/api/f1";

const apiService = {
  // Fetch all available seasons
  getSeasons: async () => {
    try {
      const response = await fetch(`${BASE_URL}/seasons.json`);
      const data = await response.json();
      return data.MRData.SeasonTable.Seasons; // Returns array of seasons
    } catch (error) {
      console.error("Error fetching seasons:", error);
      throw error;
    }
  },

  // Fetch races for a specific season
  getRacesForSeason: async (season) => {
    try {
      const response = await fetch(`${BASE_URL}/${season}/races.json`);
      const data = await response.json();
      return data.MRData.RaceTable.Races; // Returns array of races for the season
    } catch (error) {
      console.error(`Error fetching races for season ${season}:`, error);
      throw error;
    }
  },

  // Fetch race details including drivers for a specific season and race round
  getRaceDetails: async (season, round) => {
    try {
      const response = await fetch(
        `${BASE_URL}/${season}/${round}/results.json`
      );
      const data = await response.json();
      return data.MRData.RaceTable.Races[0].Results; // Returns array of driver results for the race
    } catch (error) {
      console.error(
        `Error fetching race details for season ${season}, round ${round}:`,
        error
      );
      throw error;
    }
  },
};

export default apiService;
