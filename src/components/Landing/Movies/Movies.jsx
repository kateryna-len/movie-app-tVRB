import React, { useContext } from "react";
import styles from "./movies.module.css";
import { MyContext } from "../../../ MyContext";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ModalAddMovie from "../../ModalAddMovie/ModalAddMovie";
import MovieCard from "./MovieCard/MovieCard";
import ModalWarningDelete from "../../ModalAddMovie/ModalWarningDelete";

function Movies() {
  const { searchValue, setSearchValue, alertRef } = useContext(MyContext);

  const [open, setOpen] = React.useState(false);
  const [openWarnDelete, setOpenWarnDelete] = useState(false);
  const [movieChooseDelete, setMovieChooseDelete] = useState({
    name: "",
    id: "",
  });
  const [dataMovies, setDataMovies] = useState([]);
  const [favoriteData, setFavoriteData] = useState([]);

  const alertAddNewMovie = React.useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeModalWarnDelete = () => {
    setOpenWarnDelete(false);
  };

  const handleOpenModalDelete = (name, id) => {
    setOpenWarnDelete(true);
    setMovieChooseDelete({ name: name, id: id });
  };

  const addFavoriteFilm = (id) => {
    const movie = dataMovies.filter((item) => item.id === id);
    setFavoriteData([...favoriteData, movie[0]]);
  };

  function searchMovies(searchTerm, movies) {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const deleteMovie = (id) => {
    axios
      .delete("http://localhost:3000/movies/" + id)
      .then(function (response) {
        setDataMovies(
          dataMovies.filter((movie) => movie.id !== response.data.id)
        );
        closeModalWarnDelete();
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

  const filteredMovies = searchMovies(searchValue, dataMovies);

  return (
    <div ref={alertRef} className={styles.mainBlock}>
      {favoriteData.length !== 0 && (
        <div className={styles.blockFavoriteMovies}>
          <p className={styles.titleBlock}> Favorite Movies</p>
          <div className={styles.blockCards}>
            {favoriteData.map((item, index) => (
              <MovieCard item={item} key={index} favoriteFilm={true} />
            ))}
            <div className={styles.filterBlock}></div>
            <div className={styles.filterBlock}></div>
            <div className={styles.filterBlock}></div>
            <div className={styles.filterBlock}></div>
          </div>
        </div>
      )}
      <div className={styles.blockTitle}>
        <p className={styles.titleBlock}>
          {searchValue === "" ? "Movies" : `Search result "${searchValue}"`}
        </p>
        {searchValue !== "" ? (
          <button onClick={() => setSearchValue("")}>Show all movies</button>
        ) : (
          <button onClick={() => handleClickOpen()}>Add new movie</button>
        )}
      </div>
      {filteredMovies.length === 0 && (
        <p className={styles.searchText}>NO RESULTS FOUND</p>
      )}

      <div className={styles.blockCards}>
        {dataMovies.length === 0 ? (
          <p className={styles.titleMovie}>Loading movies...</p>
        ) : (
          dataMovies.length > 0 &&
          filteredMovies.map((item, index) => (
            <MovieCard
              item={item}
              key={index}
              alertAddNewMovie={alertAddNewMovie}
              addFavoriteFilm={addFavoriteFilm}
              favoriteFilm={false}
              handleOpenModalDelete={handleOpenModalDelete}
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
      <ModalWarningDelete
        deleteMovie={deleteMovie}
        movieChooseDelete={movieChooseDelete}
        openWarnDelete={openWarnDelete}
        closeModalWarnDelete={closeModalWarnDelete}
      />
    </div>
  );
}

export default Movies;
