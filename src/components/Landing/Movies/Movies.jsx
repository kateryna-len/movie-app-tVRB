import React, { useContext } from "react";
import styles from "./movies.module.css";
import { MyContext } from "../../../ MyContext";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ModalAddMovie from "../../ModalAddMovie/ModalAddMovie";
import MovieCard from "./MovieCard/MovieCard";

function Movies({ alertRef }) {
  const { text, setText, handleClickOpen, open, handleClose } =
    useContext(MyContext);
  const [dataMovies, setDataMovies] = useState([]);
  const [favoriteData, setFavoriteData] = useState([]);
  console.log(favoriteData, "ff");

  const addFavoriteFilm = (id) => {
    const movie = dataMovies.filter((item) => item.id === id);
    setFavoriteData([...favoriteData, movie[0]]);
  };

  function searchMovies(searchTerm, movies) {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const alertAddNewMovie = React.useRef(null);

  const deleteMovie = (id) => {
    axios
      .delete("http://localhost:3000/movies/" + id)
      .then(function (response) {
        console.log(response);
        setDataMovies(
          dataMovies.filter((movie) => movie.id !== response.data.id)
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/movies/");
        setDataMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, []);

  const filteredMovies = searchMovies(text, dataMovies);

  return (
    <div ref={alertRef} className={styles.mainBlock}>
     {favoriteData.length !== 0 && <div className={styles.blockFavoriteMovies}>
        <p className={styles.titleBlock}> Favorite Movies</p>
        <div className={styles.blockCards}>
          {favoriteData.map((item, index) => (
             <MovieCard
             item={item}
             key={index}
             favoriteFilm={true}
           />
          ))}
          <div className={styles.filterBlock}></div>
        <div className={styles.filterBlock}></div>
        <div className={styles.filterBlock}></div>
        <div className={styles.filterBlock}></div>
        </div>
      </div>}
      <div className={styles.blockTitle}>
        <p className={styles.titleBlock}>
          {text === "" ? "Movies" : `Search movie "${text}"`}
        </p>
        {text !== "" ? (
          <button onClick={() => setText("")}>Show all movies</button>
        ) : (
          <button onClick={() => handleClickOpen()}>Add new movie</button>
        )}
      </div>

      <div className={styles.blockCards}>
        {dataMovies.length === 0 ? (
          <p className={styles.titleMovie}>Loading movies...</p>
        ) : (
          dataMovies.length > 0 &&
          filteredMovies.map((item, index) => (
            <MovieCard
              item={item}
              key={index}
              deleteMovie={deleteMovie}
              alertAddNewMovie={alertAddNewMovie}
              addFavoriteFilm={addFavoriteFilm}
              favoriteFilm={false}
            />
          ))
        )}
        <div ref={alertAddNewMovie} className={styles.filterBlock}></div>
        <div className={styles.filterBlock}></div>
        <div className={styles.filterBlock}></div>
        <div className={styles.filterBlock}></div>
        <div className={styles.filterBlock}></div>
      </div>
      <ModalAddMovie
        open={open}
        handleClose={handleClose}
        dataMovies={dataMovies}
        setDataMovies={setDataMovies}
        alertAddNewMovie={alertAddNewMovie}
      />
    </div>
  );
}

export default Movies;
