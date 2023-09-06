import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../Components/navbar/navbar';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { AuthContext } from '../../Context/AuthContext.js';
import genres from '../../Models/Genres'
import './Search.scss';



const Search = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const queryParam = searchParams.get('query') || '';
  const genreParam = searchParams.get('genre') || '';
  const [searchText, setSearchtext] = useState('');
  const [content, setContent] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setSearchtext(queryParam);
    const getResult = async () => {
      try {
        const result = await axios.get(
          'api/content/search' +
          `${genreParam || queryParam ? '?' : ''}${
            genreParam ? `genre=${genreParam}` : ''
          }${genreParam && queryParam ? '&' : ''}${
            queryParam ? `query=${queryParam}` : ''
          }`,
          {
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          }
        );
        setContent(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getResult();
  }, [queryParam, genreParam]);

  useEffect(() => {
    onSearchStart();
  }, [searchText]);

  // useEffect(() => {
  //   if (!user) 
  //     navigate('/login');
  // }, [user]);

  const onSearchStart = async () => {
    navigate(
      `${genreParam || searchText ? '?' : ''}${genreParam ? `genre=${genreParam}` : ''}${genreParam && searchText ? '&' : ''}${searchText ? `query=${searchText}` : ''}`
    );
  };


  return (
    <>
      <div className="main">
        <Navbar className="nav" />

        <div className="search">
          <div className="options">
            <div className="searchGroup">
              <input
                type="text"
                className="searchInput"
                value={searchText}
                onChange={(e) => setSearchtext(e.target.value)}
              />
              <button className="searchbutton" onClick={() => onSearchStart()}>
                <SearchIcon />
              </button>
            </div>
            <div>
              <h3>Choice a genre from the list below:</h3>
              <ul className="genres">
                <li
                  onClick={() =>
                    navigate(searchText ? `?query=${searchText}` : '')
                  }  >
                  All Genre
                </li>
                {genres.map((genre, i) => (
                  <li
                    value={genre}
                    key={i}
                    onClick={() =>
                      navigate(
                        searchText
                          ? `?genre=${genre}&query=${searchText}`
                          : `?genre=${genre}`
                      )} >
                    {genre}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="results">
            <h3 className="resultText">
              Your choice: {' '}
              {queryParam ? `input: ${queryParam} ` : ' '}{' '}
              {queryParam && genreParam ? `, ` : ''}
              {genreParam ? `genre: ${genreParam}` : ''}{' '}
              {queryParam || genreParam ? (
                <HighlightOffIcon
                  className="clearbutton"
                  onClick={() => {
                    navigate('/search');
                  }}
                />
              ) : (
                ''
              )}{' '}
            </h3>
            <div className="results-items">
              <div className="movies">
                <h2>Movies</h2>
                {content.length === 0 || content.every(item => item.isSeries === true) ? (
                  <p>No matching movies found.</p>
                ) : (
                  <div className="moviesRes">
                    {content.map(
                      (item) =>
                        item.isSeries === false && (
                          <Link to={{ pathname: `/details/${item._id}` }} className="link" key={item._id}>
                            <img
                              src={item.imgThumb}
                              alt={item.title}
                              key={item._id}
                              className="content"
                            />
                          </Link>
                        )
                    )}
                  </div>
                )}

              </div>
              <div className="series">
                <h2>Series</h2>
                {content.length === 0 || content.every(item => item.isSeries === false) ? (
                  <p>No matching series found.</p>
                ) : (
                  <div className="moviesRes">
                    {content.map(
                      (item) =>
                        item.isSeries && (
                          <Link to={{ pathname: `/details/${item._id}` }} className="link" key={item._id}>
                            <img
                              src={item.imgThumb}
                              alt={item.title}
                              key={item._id}
                              className="content"
                            />
                          </Link>
                        )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search