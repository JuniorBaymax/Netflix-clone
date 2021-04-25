import React, { useEffect, useState } from 'react';
import instance from '../../API/axios';
import './Row.css';

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);
  const base_url = 'https://image.tmdb.org/t/p/original/';
  useEffect(() => {
    const fetchData = async () => {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    };

    fetchData();
  }, [fetchUrl]);

  console.log(movies);
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map(
          movie =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                key={movie.id}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            )
        )}
      </div>
    </div>
  );
};

export default Row;