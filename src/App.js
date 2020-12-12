import React from 'react';
import ListPeople from './ListPeople';

const SWAPI_PEOPLE_URL = 'https://swapi.dev/api/people';

function PrettyPrintResult(props) {
  return (<pre>{JSON.stringify(props.value, null, 2)}</pre>);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, isLoaded: false, result: {} };
  }

  retrieveResults(url) {
    this.state = { error: null, isLoaded: false, result: {} };
    
    fetch(url)
      .then(res => res.json())
      .then(
        (jsonResponse) => {
          this.setState({ error: null, isLoaded: true, result: jsonResponse });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (err) => {
          this.setState({ error: err, isLoaded: true, result: {} });
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
                onClick={() => this.retrieveResults(this.state.result.previous)}>
              Previous
            </button>
            <button
                onClick={() => this.retrieveResults(this.state.result.next)}>
              Next
            </button>
          </div>
          <PrettyPrintResult value={this.state.result} />
          <ListPeople value={this.state.result.results} />
        </div>
      );
    }
  }
}

export default App;
