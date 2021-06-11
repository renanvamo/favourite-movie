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
    const { searchValue, movies } = this.state;
    const headers = { }
    const url = `https://api.themoviedb.org/3/search/movie?api_key=8d11dad924e05cee382c64587720ae74&language=pt-br&query=${searchValue}&page=1&include_adult=true`;
    await fetch(url, headers)
      .then(response => response.json()
      .then(({ results }) => (
        this.setState({ movies: results })         
      )));
  }

  render() {
    const { movies, searchValue } = this.state;
    return (
      <main className=''>
        <header className='header'>
          <MovieListHeading heading='My Favourite Movies' />
          <SearchBox searchValue={ searchValue } handleSearch={ this.handleSearch }/>
        </header>
        <section className='movie-container'>
          { movies ? <MovieCards movies={ movies } /> : <span></span>}
        </section>
		  </main>
    );
  }
}

export default App;
