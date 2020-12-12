import React, { useEffect, useState } from 'react';
import PersonSummary from './PersonSummary';

const SWAPI_PEOPLE_URL = 'https://swapi.dev/api/people';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [result, setResult] = useState({});

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(SWAPI_PEOPLE_URL)
      .then(res => res.json())
      .then(
        (result) => {
          setResult(result);
          setIsLoaded(true);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>Swapi Viewer</h1>
        <ul>
          {result.results.map(person => (
            <li>
              <PersonSummary value={person}/>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
