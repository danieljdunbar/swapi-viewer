import React, {useState, useEffect} from 'react';
import {SwapiResponse} from './common_interfaces';
import {ListPeople} from './ListPeople';

const SWAPI_PEOPLE_URL = 'https://swapi.dev/api/people';

interface IState {
  error: Error|undefined;
  isLoaded: boolean;
  result: SwapiResponse|undefined;
}

export interface IProps {
  value?: any;
}

function PrettyPrintResult(props: IProps) {
  return (<pre>{JSON.stringify(props.value, null, 2)}</pre>);
}

function App() {
  const [error, setError] = useState<Error>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [result, setResult] = useState<SwapiResponse>({} as SwapiResponse);

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
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <h1>Swapi Viewer</h1>
        <div>
          <button
              onClick={() => retrieveResults(result.previous)}>
            Previous
          </button>
          <button
              onClick={() => retrieveResults(result.next)}>
            Next
          </button>
        </div>
        {/* <PrettyPrintResult value={this.state.result} /> */}
        <ListPeople value={result ? result.results : []} />
      </div>
    );
  }
}

export default App;
