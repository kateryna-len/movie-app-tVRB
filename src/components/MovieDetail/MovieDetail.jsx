import React from "react";
import styles from "./movieDetail.module.css";
import { useParams } from "react-router-dom";
import iconPencil from "../../image/pencilIcon.svg";
import data from "../../image/date.svg";
import star from "../../image/star.svg";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Modal from "../ModalAddMovie/Modal";
import arrowIcon from "../../image/arrow.svg"
import { Link } from "react-router-dom";

function MovieDetail() {
  const { id } = useParams();
  const [dataMovie, setDataMovie] = useState(null);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/movies/" + id);
        setDataMovie(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.mainBlock}>
       <Link to="/"> <div className={styles.blockBack}> <img src={arrowIcon} alt="arrow"/><p>Back</p></div> </Link>
      {dataMovie && (
        <div className={styles.blockMove}>
          <div>
            <img src={dataMovie.image} className={styles.imgMovie} />
          </div>
          <div className={styles.blockInfo}>
            <div className={styles.blockTitle}>
              <p className={styles.title}>{dataMovie.title}</p>
              <button
                className={styles.btnFavorite}
                onClick={() => setOpenModalEdit(true)}
              >
                  Edit
                <img src={iconPencil} alt="icon plus" />
              
              </button>
            </div>

            <div className={styles.containerFlex}>
              <div className={styles.blockGenres}>
                {dataMovie.genre.map((item, index) => (
                  <div key={index} className={styles.blockGenere}>
                    {item}
                  </div>
                ))}
              </div>
              <div className={styles.blockIconDate}>
                <img src={data} alt="icon data" />
                <p>{dataMovie.release_date.slice(0, 4)}</p>
              </div>
              <div className={styles.blockIconDate}>
                <img src={star} alt="icon star" />
                <p>{dataMovie.rating}</p>
              </div>
            </div>
            <p className={styles.description}>{dataMovie.description}</p>
            <div>
              <div className={styles.blockAdditionInfo}>
                <p>Director:</p>
                <p>{dataMovie.director}</p>
              </div>
              <div className={styles.blockAdditionInfo}>
                <p>Cast :</p>
                <p>{dataMovie.actors.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal
        setOpenModalEdit={setOpenModalEdit}
        dataMovie={dataMovie}
        open={openModalEdit}
      />
    </div>
  );
}

export default MovieDetail;
