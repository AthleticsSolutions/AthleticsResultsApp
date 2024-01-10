// Schedule.js
import React from "react";

const Schedule = ({ schedule }) => {
  return (
<div className="text-center pt-16">
  <table className="mx-auto w-full">
    <thead className="text-3xl">
      <tr>
        <th>Čas</th>
        <th>Disciplína</th>
        <th>Kategorie</th>
        <th>Fáze</th>
        <th>Vítr</th>
        <th>ID kamery</th>
        <th>Oficiální</th>
      </tr>
    </thead>
    <tbody className="text-2xl">
      {schedule.map((event, index) => (
        <React.Fragment key={event.starttime}>
          <tr>
            <td>{event.starttime}</td>
            <td>{event.discipline}</td>
            <td>{event.category}</td>
            <td>{event.phase}</td>
            <td>{event.wind}</td>
            <td>{event.cameraid}</td>
            <td style={{ color: event.resultsOfficial ? "green" : "red" }}>
              {event.resultsOfficial ? "✓" : "✗"}
            </td>
          </tr>
          {index < schedule.length && <tr><td colSpan="7"><hr /></td></tr>}
        </React.Fragment>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default Schedule;
