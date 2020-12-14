import React from 'react';
import {IProps, SwapiResponse} from './common_interfaces';
import ListPeople from './ListPeople';

const SWAPI_PEOPLE_URL = 'https://swapi.dev/api/people';

interface IState {
  error: Error|undefined;
  isLoaded: boolean;
  result: SwapiResponse|undefined;
}

function PrettyPrintResult(props: IProps) {
  return (<pre>{JSON.stringify(props.value, null, 2)}</pre>);
}

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { error: undefined, isLoaded: false, result: undefined };
  }

  retrieveResults(url: string|null) {
    if (!url) {
      return;
    }

    this.state = { error: undefined, isLoaded: false, result: undefined };
    
    fetch(url)
      .then(res => res.json())
      .then(
        (jsonResponse) => {
          const response: SwapiResponse = JSON.parse(JSON.stringify(jsonResponse));
          this.setState({ error: undefined, isLoaded: true, result: response });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (err) => {
          this.setState({ error: err, isLoaded: true, result: undefined });
        }
      );
  }

  componentDidMount() {
    this.retrieveResults(SWAPI_PEOPLE_URL);
  }

  render() {
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    } else if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>Swapi Viewer</h1>
          <div>
            <button
                onClick={() => this.retrieveResults(this.state.result!.previous)}>
              Previous
            </button>
            <button
                onClick={() => this.retrieveResults(this.state.result!.next)}>
              Next
            </button>
          </div>
          {/* <PrettyPrintResult value={this.state.result} /> */}
          <ListPeople value={this.state.result ? this.state.result.results : []} />
        </div>
      );
    }
  }
}

export default App;
