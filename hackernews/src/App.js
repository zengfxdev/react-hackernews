import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };

    this.setSearchTopStories = this
      .setSearchTopStories
      .bind(this);
    this.fetchSearchTopStories = this
      .fetchSearchTopStories
      .bind(this);
    this.onSearchChange = this
      .onSearchChange
      .bind(this);
    this.onDismiss = this
      .onDismiss
      .bind(this);
  }

  // lifeCycle
  componentDidMount() {
    const {searchTerm} = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  // private method
  setSearchTopStories(result) {
    console.log(`setSearchTopStories data is ${result}`);
    this.setState({result});
  }

  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => e);
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  onDismiss(id) {

    const isNotId = item => item.objectID !== id;
    const updateHits = this
      .state
      .result
      .hits
      .filter(isNotId);

    this.setState({
      result: {
        ...this.state.result,
        hits: updateHits
      }
    });
  }

  render() {
    const {searchTerm, result} = this.state;
    return (
      <div className="page">
        {/* <Search value={searchTerm} onChange={this.onSearchChange}>
        Search
      </Search> */}

        {result && <Table list={result.hits} pattern={searchTerm} onDismiss={this.onDismiss}/>}

      </div>
    );
  }

}

class Search extends Component {}

const isSearched = searchTerm => item => item
  .title
  .toLowerCase()
  .includes(searchTerm.toLowerCase());
// function isSearched(searchTerm) {   return function (item) {     return item
//   .title       .toLowerCase()       .includes(searchTerm.toLowerCase()); } }

class Table extends Component {
  render() {
    const {list, pattern, onDismiss} = this.props;
    return (
      <div className="table">
        {list
          .filter(isSearched(pattern))
          .map(item => <div key={item.objectID} className="table-row">
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                onClick={() => onDismiss(item.objectID)}
                type="button"
                className="button-inline">
                Dismiss
              </button>
            </span>
          </div>)}
      </div>
    );
  }
}

export default App;