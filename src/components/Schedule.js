// Schedule.js
import React from 'react';

const Schedule = ({ schedule }) => {
  return (
    <div>
      <h2 class="text-3xl font-bold">Schedule</h2>
      <table>
        <thead>
          <tr>

          </tr>
        </thead>
        <tbody class = "text-3xl"> 
          {schedule.map((event) => (
            <tr key={event.starttime}>
            <td>{event.starttime}</td>
              <td>{event.wind}</td>
              <td style={{ color: event.resultsOfficial ? 'green' : 'red' }}>
                {event.resultsOfficial ? 'true' : 'false'}
              </td>
              <td>{event.category}</td>
           
              <td>{event.gender === 0 ? 'M' : 'Ž'}</td>
              <td>{event.discipline}</td>
              <td>{event.phase}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
