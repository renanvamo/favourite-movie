import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import MovieListHeading from './Components/MovieListHeading';
import SearchBox from './Components/SearchBox'
import MovieCards from './Components/MovieCards';

class App extends React.Component {
  constructor() {
    super();
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      movies: [],
      searchValue: '',
    };
  }

  handleSearch({ target }) {
    this.setState({
      searchValue: target.value
    });
    this.getMovies()
  }

  async getMovies() {
    const { searchValue } = this.state;
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=a05e989d`;
    await fetch(url)
      .then(response => response.json()
      .then((movies) => this.setState({ movies: movies.Search })));
  }
  
  render() {
    const { movies, searchValue } = this.state;
    return (
      <div className='container-fluid movie-app'>
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading='My Favourite Movies' />
          <SearchBox searchValue={ searchValue } handleSearch={ this.handleSearch }/>
        </div>
        <div className='row'>
          <MovieCards movies={ movies } />
        </div>
		  </div>
    );
  }
}

export default App;
