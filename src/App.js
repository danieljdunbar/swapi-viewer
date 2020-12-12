import React, { useEffect, useState } from 'react';

const SWAPI_PEOPLE_URL = 'https://swapi.dev/api/people';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [people, setPeople] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(SWAPI_PEOPLE_URL)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPeople(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>{JSON.stringify(people)}</div>
    );
  }
}

export default App;
