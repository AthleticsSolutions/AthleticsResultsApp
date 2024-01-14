// Schedule.js
import React, { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";
import ExpandedTable from "./ExpandedTable";

const Schedule = ({ schedule }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleMenu = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="text-center pt-8 sm:pt-16 px-4 sm:px-16 overflow-x-auto">
      <table className="mx-auto w-full">
        <thead className="text-2xl sm:text-3xl">
          <tr>
            <th></th>
            <th>Čas</th>
            <th>Disciplína</th>
            <th>Kategorie</th>
            <th>Fáze</th>
            <th>Vítr</th>
            <th>ID kamery</th>
            <th>Oficiální</th>
          </tr>
        </thead>
        <tbody className="text-xl sm:text-2xl">
          {schedule.map((event, index) => (
            <React.Fragment key={event.starttime}>
              <tr>
                <td style={{ textAlign: "center" }}>
                  <HamburgerMenu
                    isOpen={expandedIndex === index}
                    onClick={() => toggleMenu(index)}
                    size={16}
                  />
                </td>
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
              {expandedIndex === index && (
                <tr>
                  <td colSpan="8">
                    <div className="expanded-content">
                      <ExpandedTable results={event} eventId={event.id} />
                    </div>
                  </td>
                </tr>
              )}
              {index < schedule.length && (
                <tr>
                  <td colSpan="8">
                    <hr className="border-slate-600" />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
