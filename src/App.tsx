import React, { Dispatch, useState, useEffect, useCallback } from 'react';
import './App.css';
import SearchAppBar from './component/searchAppBar';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from './redux/reducers/rootReducer';
import { MovieActions } from './redux/actions/movieActions';
import { FiltersActions } from './redux/actions/filtersActions';
import { movies$ } from "./data/movies";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MovieCard from "./component/movieCard";
import { CategoryElem } from './utils/interfaces';
import { MovieElem } from "./utils/interfaces";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { reduxMovies, searchText, categories, cardsByPage } = useSelector((state: AppState) => {
    return ({
      reduxMovies: state.movie.movies,
      searchText: state.filter.searchText,
      categories: state.filter.categories,
      cardsByPage: state.filter.page
    })
  });
  const movieDispatch = useDispatch<Dispatch<MovieActions>>();
  const filtersDispatch = useDispatch<Dispatch<FiltersActions>>();


  const setMovies = useCallback((movies: Array<MovieElem>) => {
    movieDispatch({ type: 'SET_MOVIES', value: movies });
  }, [movieDispatch]);

  const setCategories = useCallback((movies: Array<MovieElem>) => {
    movies.forEach((movie) => {
      filtersDispatch({
        type: 'ADD_CATEGORY', category: {
          name: movie.category,
          selected: true
        }
      });
    })
  }, [filtersDispatch]);

  useEffect(() => {
    movies$.then(movies => {
      setCategories(movies)
      setMovies(movies);
    })
  }, [setMovies, setCategories]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const setCardsByPage = (cards: number) => {
    filtersDispatch({ type: 'CHANGE_PAGE_ELEMS', value: cards });
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function listCards() {
    if (!reduxMovies || reduxMovies.length === 0) {
      return (<div />)
    }

    categories.forEach(element => {
      const moviesInCategory = reduxMovies.filter(movie => movie.category === element.name);
      if (moviesInCategory.length === 0) {
        filtersDispatch({ type: 'DELETE_CATEGORY', value: element.name })
      }
    });

    const filteredMovies = reduxMovies.filter((movie: MovieElem) => {
      const movieCategory = categories.filter((category: CategoryElem) => {
        return (category.name === movie.category)
      })
      if (movieCategory.length === 1 && !movieCategory[0].selected) {
        return false;
      }
      if (searchText === '') {
        return true;
      }
      return movie.title.toLowerCase().includes(searchText.toLowerCase());
    })


    return (
      <Grid container spacing={3}>
        {
          filteredMovies
            .filter((element: MovieElem, i: number) => i >= (currentPage - 1) * cardsByPage && i < (currentPage) * cardsByPage)
            .map((element: MovieElem, i: number) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <MovieCard key={i} movie={element} id={i} />
                </Grid>
              )
            })
        }
      </Grid>
    )
  }

  return (
    <div className="App">
      <SearchAppBar />
      <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
            <Typography>Afficher </Typography>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <Typography>{cardsByPage}</Typography>
              <ArrowDropDownIcon/>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => setCardsByPage(4)}>4</MenuItem>
              <MenuItem onClick={() => setCardsByPage(8)}>8</MenuItem>
              <MenuItem onClick={() => setCardsByPage(12)}>12</MenuItem>
            </Menu>
            <Typography> films par page.</Typography>
          </Grid>
      <Container className="mainContainer">
        {listCards()}
      </Container>
      <Grid container justify="center" className="pagination" spacing={3}>
        <Pagination count={(Math.trunc(reduxMovies.length / cardsByPage) + ((reduxMovies.length % cardsByPage === 0) ? 0 : 1))} page={currentPage} onChange={(e, page) => setCurrentPage(page)} color="primary" />
        <Grid item xs={12}>
          
        </Grid>
      </Grid>
    </div>
  );
}

export default App;