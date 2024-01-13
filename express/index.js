const express = require("express");
const axios = require("axios");
const cors = require("cors");

const baseUrl = "http://192.168.0.115:9090";
const UrlRaces = `${baseUrl}/api/races`;
const UrlDisciplines = `${baseUrl}/api/disciplines`;

const app = express();
const port = 4000;

function convertToTimeOnly(timestamp) {
  const dateObject = new Date(timestamp);
  const hours = dateObject.getHours().toString().padStart(2, "0");
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");
  const seconds = dateObject.getSeconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}

app.use("/races", cors(), async (req, res) => {
  try {
    const response = await axios.get(UrlRaces);
    const data = response.data.data;
    const activeRaces = data.filter((race) => race.isActive === true);

    const sortedData = activeRaces.sort(
      (a, b) => new Date(a.start) - new Date(b.start)
    );

    const races = sortedData.map((data) => ({
      title: data.title,
      city: data.venue,
      organiser: data.organiser,
      isActive: data.isActive,
    }));

    res.json({ races });
  } catch (error) {
    console.error("Error fetching data from API", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/results/:id", cors(), async (req, res) => {
  try {
    const { id } = req.params;
    const UrlResults = `${baseUrl}/api/results/v3?disciplineIds=${id}`;
    const response = await axios.get(UrlResults);
    const data = response.data.data;

    const sortedData = data.sort(
      (a, b) => new Date(a.resultDate) - new Date(b.resultDate)
    );

    const results = sortedData.map((data) => ({
      track: data.track,
      firstName: data.firstName,
      lastName: data.lastName,
      club: data.clubTitle,
      isActive: data.isActive,
      result: data.bestResult,
      place : data.order,
      sb : data.seasonalBest
    }));

    res.json({ results });
  } catch (error) {
    console.error("Error fetching data from API", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.use("/time_schedule", cors(), async (req, res) => {
  try {
    const response = await axios.get(UrlDisciplines);
    const data = response.data.data;

    const sortedData = data.sort(
      (a, b) => new Date(a.start) - new Date(b.start)
    );

    const schedule = sortedData.map((data, index) => ({
      id: data.id,
      cameraid: data.cameraId,
      wind: data.wind,
      resultsOfficial: data.isOfficialResults,
      category: data.categoryClassDescription,
      starttime: convertToTimeOnly(data.start),
      gender: data.sex,
      discipline: data.disciplineClassDescription,
      phase: data.phaseClassDescription,
    }));

    res.json({ schedule });
  } catch (error) {
    console.error("Error fetching data from API", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port} `);
});
