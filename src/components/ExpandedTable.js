import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpandedTable = ({ results, eventId }) => {
  const [expandedResults, setExpandedResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/results/${eventId}`
        );
        const sortedResults = response.data.results
          ? response.data.results.sort((a, b) => a.place - b.place)
          : [];
        setExpandedResults(sortedResults);
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    };

    fetchData();
  }, [eventId]);

  return (
    <table className="mx-auto w-full expanded-table mt-8 mb-8">
      <thead className="text-3xl">
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
      <tbody className="text-2xl">
        {expandedResults.map((result) => (
          <tr key={result.place}>
            <td>{result.place ?? "✗"}.</td>
            <td>{result.track}</td>
            <td>{result.firstName}</td>
            <td>{result.lastName}</td>
            <td>{result.club}</td>
            <td>{result.result}</td>
            <td>{result.result < result.sb ? "SB" : result.result < result.pb && result.pb != null ? "PB" : ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpandedTable;
