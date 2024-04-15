import React from 'react'
import styles from './movieCard.module.css'
import { Link } from 'react-router-dom'
import deleteIcon from "../../../../image/delete.svg";
import iconHeart from "../../../../image/heartIcon.svg";

function MovieCard({item, key, deleteMovie, addFavoriteFilm, favoriteFilm}) {
  return (
    <>
    <div key={key} className={styles.movieCard}>
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
    <div className={styles.blockBtncard}>
    {!favoriteFilm && <button className={styles.btnaddFavorite} onClick={()=> addFavoriteFilm(item.id)}><img src={iconHeart} alt="heart" /></button>} 
         {!favoriteFilm && <button className={styles.btnDelete} onClick={() => deleteMovie(item.id)}><img src={deleteIcon} alt="icon"/></button>}

    </div>

  </div>
  </>
  )
}

export default MovieCard
