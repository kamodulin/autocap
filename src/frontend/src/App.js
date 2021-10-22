import React, { useState, useEffect } from 'react';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/api/test').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Time from Flask API using Python datetime: {currentTime}.</p>
      </header>
    </div>
  );
}

export default App;