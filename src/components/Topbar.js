import React, { useState, useEffect } from "react";
import axios from "axios";

function Topbar(props) {
  const [raceData, setRaceData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_LOCAL_URL;
        const response = await axios.get(`${apiUrl}/races`);
        console.log(`${apiUrl}/races`);

        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const races = response.data.races;
        setRaceData(races);
      } catch (error) {
        console.error("Error fetching race data from API", error);
        setError(error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const today = new Date();
  const dayNumber = today.getDate();
  const monthNumber = today.getMonth() + 1;
  const yearNumber = today.getFullYear();

  return (
    <div>
      <form className="bg-slate-800 flex flex-col sm:flex-row items-stretch justify-between gap-5 pt-1.5 pb-5 px-4 sm:px-16 max-md:flex-wrap max-md:px-5">
        <header className="flex items-start justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
          <img
            loading="eager"
            srcSet="images/cas-logo.png"
            className="aspect-[2.82] object-contain object-center w-[203px] overflow-hidden shrink-0 max-w-full mt-3"
            alt="Logo"
          />
          <span className="flex grow basis-[0%] flex-col items-stretch">
            <h1 className="pt-1 mt-1 text-5xl font-bold text-white">
              {raceData.length > 0 ? raceData[0].title : "Error"}
            </h1>
            <div className="flex flex-col justify-between gap-5 mt-0 sm:flex-row">
              <div className="flex-wrap text-2xl text-neutral-400">
                <span>{dayNumber}.</span>
                <span className="mx-1">{monthNumber}.</span>
                <span className="mx-1">{yearNumber}</span>
              </div>
              <h1 className="flex-wrap text-2xl text-neutral-400 sm:w-auto sm:flex-shrink-0">
                {raceData.length > 0 ? raceData[0].city : "ERROR"}
              </h1>
            </div>
          </span>
        </header>
        <span className="self-center flex items-stretch gap-3.5 my-auto">
          <h2 className="text-4xl font-bold text-white grow whitespace-nowrap flex-nowrap">
            Server AK
          </h2>
          {error ? (
            <img
              loading="eager"
              src="images/cross-red.png"
              className="aspect-[1] object-contain object-center w-[30px] fill-red-600 overflow-hidden shrink-0 mt-1 max-w-full self-start"
              alt="Error Icon"
            />
          ) : (
            <img
              loading="eager"
              src="images/tick-green.png"
              className="aspect-[1] object-contain object-center w-[30px] fill-green-600 overflow-hidden shrink-0 mt-1 max-w-full self-start"
              alt="Success Icon"
            />
          )}
        </span>
      </form>
    </div>
  );
}

export default Topbar;
