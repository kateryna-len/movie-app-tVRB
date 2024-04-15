import React, { useContext } from "react";
import styles from "./movies.module.css";
import { MyContext } from "../../../ MyContext";
import { Link } from "react-router-dom";

function Movies({ alertRef }) {
  const { text, setText, dataMovies, handleClickOpen } = useContext(MyContext);

  function searchMovies(searchTerm, movies) {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const filteredMovies = searchMovies(text, dataMovies);

  return (
    <div ref={alertRef} className={styles.mainBlock}>
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
            <div key={index} className={styles.movieCard}>
              <Link to={`/movie/${item.id}`}>
                <div className={styles.ratingLiba}>
                  <p className={styles.textRating}>{item.rating}</p>
                </div>
                <img
                  src={item.image}
                  alt="img film"
                  className={styles.imgMovie}
                />
                <div>
                  <p className={styles.titleMovie}>{item.title}</p>
                  <p className={styles.yearMovie}>
                    {item.release_date.slice(0, 4)}
                  </p>
                </div>
              </Link>
            </div>
          ))
        )}
        <div className={styles.filterBlock}></div>
        <div className={styles.filterBlock}></div>
        <div className={styles.filterBlock}></div>
        <div className={styles.filterBlock}></div>
        <div className={styles.filterBlock}></div>
      </div>
    </div>
  );
}

export default Movies;
