import React, { useContext } from "react";
import styles from "./movieDetail.module.css";
import { useParams } from "react-router-dom";
import { MyContext } from "../../ MyContext";
import iconPlus from "../../image/plus.svg";
import data from "../../image/date.svg";
import star from "../../image/star.svg";

function MovieDetail() {
  const { id } = useParams();
  const { dataMovies, handleClickOpen } = useContext(MyContext);

  const openEditMovie = () => {
    handleClickOpen();
  };

  const filteredMoviesById = dataMovies.filter((movie) => movie.id === +id);

  return (
    <div className={styles.mainBlock}>
      {filteredMoviesById.length !== 0 && (
        <div className={styles.blockMove}>
          <div>
            <img
              src={filteredMoviesById[0].image}
              className={styles.imgMovie}
            />
          </div>
          <div className={styles.blockInfo}>
            <div className={styles.blockTitle}>
              <p className={styles.title}>{filteredMoviesById[0].title}</p>
              <button className={styles.btnFavorite} onClick={openEditMovie}>
                <img src={iconPlus} alt="icon plus" />
                Add to Favourite
              </button>
            </div>

            <div className={styles.containerFlex}>
              <div className={styles.blockGenres}>
                {filteredMoviesById[0].genre.map((item, index) => (
                  <div key={index} className={styles.blockGenere}>
                    {item}
                  </div>
                ))}
              </div>
              <div className={styles.blockIconDate}>
                <img src={data} alt="icon data" />
                <p>{filteredMoviesById[0].release_date.slice(0, 4)}</p>
              </div>
              <div className={styles.blockIconDate}>
                <img src={star} alt="icon star" />
                <p>{filteredMoviesById[0].rating}</p>
              </div>
            </div>
            <p className={styles.description}>
              {filteredMoviesById[0].description}
            </p>
            <div>
              <div className={styles.blockAdditionInfo}>
                <p>Director:</p>
                <p>{filteredMoviesById[0].director}</p>
              </div>
              <div className={styles.blockAdditionInfo}>
                <p>Cast :</p>
                <p>{filteredMoviesById[0].actors.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieDetail;
