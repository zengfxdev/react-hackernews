import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App2 extends Component {

    render() {
        const {searchTerm, list} = this.state;
        return (
            <div className="App">
                <Search value={searchTerm} onChange={this.onSearchChange}></Search>
            </div>
        )
    }
}

class Search extends Component {

    render() {
        const {value, onChange} = this.props;
        return (
            <form>
                <input type="text" value={value} onChange={onChange}/>
            </form>
        )
    }
}

class Table extends Component {
    render() {
        const {list, pattern, onDismiss} = this.props;
        return (
            <div>
                {list.filter(isSearched(pattern).map(item => <div key={item.objectID}>
                    <span>
                        <a href={item.url}>{item.title}</a>
                    </span>
                    <span>{item.author}</span>
                    <span>{item.num_comments}</span>
                    <span>{item.points}</span>
                    <span>
                        {/* <button
                        onClick={function () {
                        console.log(item.objectID);
                      }}
                        type="button">
                        Dismiss
                      </button> */}
                        <button onClick={() => this.onDismiss(item.objectID)} type="button">
                            Dismiss
                        </button>
                    </span>
                </div>))}
            </div>
        );
    }
}

const isSearched = searchTerm => item => item
    .title
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

const list = [
    {
        title: 'React',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0
    }, {
        title: 'Redux',
        url: 'https://github.com/reactjs/redux',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1
    }
];
