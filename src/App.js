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
        const response = await axios.get('http://localhost:4000/time_schedule');
        setSchedule(response.data.schedule);
      } catch (error) {
        console.error('Error fetching data from API', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
        <Topbar> </Topbar>
      <h1 class="text-yellow-500 text-6xl">Test</h1>
      <Schedule schedule={schedule} />
    </div>
  );
}

export default App;
