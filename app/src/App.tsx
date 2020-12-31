import React, { useEffect, useState } from 'react';
import './App.css';
import TableRestaurant from './Table_Restaurant/main';

function App() {
  const [restaurants, setRestaurants] = useState([]);
  const fetchCall = () => {
    fetch(`https://code-challenge.spectrumtoolbox.com/api/restaurants`, {
      headers: {
        Authorization: `Api-Key q3MNxtfep8Gt`,
      },
    })
      .then(res => res.json())
      .then(res => setRestaurants(res))
      .catch(err => alert(err));
  }

  const reset = () => {
    fetchCall();
  }

  useEffect(() => {
    fetchCall();
  }, []);

  return (
    <div className="App">
      <TableRestaurant restaurants={restaurants} setRestaurants={setRestaurants} reset={reset} />
    </div>
  );
}

export default App;
