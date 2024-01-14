// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Schedule from './components/Schedule';
import Topbar from './components/Topbar'

function App() {

  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_LOCAL_URL;
        const response = await axios.get(`${apiUrl}/time_schedule`);
        setSchedule(response.data.schedule);
      } catch (error) {
        console.error('Error fetching data from API', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
        <Topbar />

      <Schedule schedule={schedule} />
    </div>
  );
}

export default App;
