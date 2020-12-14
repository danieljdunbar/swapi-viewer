import React, {useState, useEffect} from 'react';
import {Button, Paper} from '@material-ui/core';
import {SwapiResponse, DEFAULT_SWAPI_RESPONSE} from './common_interfaces';
import {ListPeople} from './ListPeople';
import { selectPerson } from './redux/PersonSlice';
import { useSelector } from 'react-redux';
import './App.css';

const SWAPI_PEOPLE_URL = 'https://swapi.dev/api/people';

export interface IProps {
  value?: any;
}

function PrettyPrintResult(props: IProps) {
  return (<pre>{JSON.stringify(props.value, null, 2)}</pre>);
}

function App() {
  const selectedPerson = useSelector(selectPerson);
  const [error, setError] = useState<Error>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [result, setResult] = useState<SwapiResponse>(DEFAULT_SWAPI_RESPONSE);

  const retrieveResults = (url: string|null) => {
    if (!url) {
      return;
    }

    setIsLoaded(false);

    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          const response: SwapiResponse = JSON.parse(JSON.stringify(result));

          setResult(response);
          setIsLoaded(true);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  }

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    retrieveResults(SWAPI_PEOPLE_URL);
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div>
        <Paper className="swapi-header">Swapi Viewer</Paper>
        <Paper className="swapi-header">{selectedPerson.name}</Paper>
        <div className="page-buttons">
          <Button
              className="previous-button"
              color="primary"
              variant="contained"
              disabled={result.previous === null}
              onClick={() => retrieveResults(result.previous)}>
            Previous
          </Button>
          <Button
              className="next-button"
              color="primary"
              variant="contained"
              disabled={result.next === null}
              onClick={() => retrieveResults(result.next)}>
            Next
          </Button>
        </div>
        <div className="content-container">
          <ListPeople 
              isLoaded={isLoaded}
              people={result ? result.results : []} />
        </div>
      </div>
    );
  }
}

export default App;
