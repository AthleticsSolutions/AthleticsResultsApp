import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpandedTable = ({ results, eventId }) => {
  const [expandedResults, setExpandedResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_LOCAL_URL;
        const response = await axios.get(`${apiUrl}/results/${eventId}`);
        const sortedResults = response.data.results ? response.data.results.sort((a, b) => a.place - b.place) : [];
        setExpandedResults(sortedResults);
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, [eventId]);
  
  return (
    <table className="mx-auto w-full expanded-table mt-2 sm:mt-8 mb-2 sm:mb-8">
      <thead className="text-sm sm:text-3xl">
        <tr>
          <th>Místo</th>
          <th>Dráha</th>
          <th>Jméno</th>
          <th>Příjmení</th>
          <th>Klub</th>
          <th>Výkon</th>
          <th></th>
        </tr>
      </thead>
      <tbody className="text-xs sm:text-2xl">
        {expandedResults
          .sort((a, b) => {
            const specialTypes = [1, 2, 3, 4];
            return specialTypes.includes(a.type) ? 1 : specialTypes.includes(b.type) ? -1 : (a.place || 0) - (b.place || 0);
          })
          .map((result, index) => (
            <tr key={index + 1}>
              <td>{result.type !== 4 && result.place !== null ? index + 1 + "." : ""}</td>
              <td>{result.track}</td>
              <td>{result.firstName}</td>
              <td>{result.lastName}</td>
              <td>{result.club}</td>
              <td>{result.result}</td>
              <td>{result.result === null ? "" : result.type === 1 ? "DNS" : result.type === 2 ? "DNF" : result.type === 3 ? "DQ" : result.type === 4 ? "NM" : result.pb !== null && result.result < result.pb ? "PB" : result.result < result.sb ? "SB" : ""}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default ExpandedTable;