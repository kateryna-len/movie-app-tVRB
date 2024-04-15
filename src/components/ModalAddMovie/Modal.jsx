import React, { useContext, useEffect, useState } from "react";
import styles from "./modulAddMovie.module.css";
import Dialog from "@mui/material/Dialog";
import closeIcon from "../../image/close.svg";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { MyContext } from "../../ MyContext";
import axios from "axios";

function ModalAddMovie({ dataMovie, open, setOpenModalEdit }) {
  const { register, handleSubmit, reset } = useForm();
  const [editMovie, setEditMovie] = useState([]);
  const [dataMovies, setDataMovies] = useState([]);
  const close = () => {
    setOpenModalEdit(false);
  };

  useEffect(() => {
    setEditMovie(dataMovie);
  }, [open]);

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

  const updateMovie = async (updatedMovie) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/movies/" + updatedMovie.id,
        updatedMovie
      );

      if (response.status === 200) {
        const updatedMovies = [...dataMovies];
        const updatedMovieIndex = updatedMovies.findIndex(
          (movie) => movie.id === updatedMovie.id
        );
        updatedMovies[updatedMovieIndex] = updatedMovie;
        window.location.reload(true);
      } else {
        console.error("Error updating movie:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  const onSubmit = async (data) => {
    updateMovie(editMovie);
    close();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className={styles.blockMain}>
        <div className={styles.blockTitle}>
          <p className={styles.title}>Edit Movie</p>
          <img
            style={{ cursor: "pointer" }}
            onClick={() => close()}
            src={closeIcon}
            alt="close icon"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className={styles.blockField}>
              <p className={styles.label}>Name</p>
              <TextField
                {...register("title")}
                id="outlined-basic"
                fullWidth
                placeholder="Name Movie"
                variant="outlined"
                value={editMovie ? editMovie.title : ""}
                onChange={(e) =>
                  setEditMovie({ ...editMovie, title: e.target.value })
                }
              />
            </div>
            <div className={styles.blockField}>
              <p className={styles.label}>Description</p>
              <TextField
                {...register("description")}
                id="outlined-basic"
                multiline
                rows={3}
                fullWidth
                placeholder="Description Movie"
                variant="outlined"
                value={editMovie ? editMovie.description : ""}
                onChange={(e) =>
                  setEditMovie({ ...editMovie, description: e.target.value })
                }
              />
            </div>

            <div className={styles.blockField}>
              <p className={styles.label}>Image Address</p>
              <TextField
                {...register("image")}
                id="outlined-basic"
                fullWidth
                placeholder="Image Address"
                variant="outlined"
                value={editMovie ? editMovie.image : ""}
                onChange={(e) =>
                  setEditMovie({ ...editMovie, image: e.target.value })
                }
              />
            </div>
            <div className={styles.blockField}>
              <p className={styles.label}>Genres</p>
              <p className={styles.warning}>
                *separate more than one genre with a comma
              </p>
              <TextField
                {...register("genre")}
                id="outlined-basic"
                fullWidth
                placeholder="Genres Movie"
                variant="outlined"
                value={editMovie ? editMovie.genre : ""}
                onChange={(e) =>
                  setEditMovie({
                    ...editMovie,
                    genre: e.target.value.split(","),
                  })
                }
              />
            </div>
            <div className={styles.blockField}>
              <p className={styles.label}>Actors</p>
              <p className={styles.warning}>
                *separate more than one actors with a comma
              </p>
              <TextField
                {...register("actors")}
                id="outlined-basic"
                fullWidth
                placeholder="Actors Movie"
                variant="outlined"
                value={editMovie ? editMovie.actors : ""}
                onChange={(e) =>
                  setEditMovie({
                    ...editMovie,
                    actors: e.target.value.split(","),
                  })
                }
              />
            </div>

            <div className={styles.blockField}>
              <p className={styles.label}>Rating 0-10</p>
              <TextField
                {...register("rating")}
                id="outlined-basic"
                fullWidth
                placeholder="Rating Movie"
                variant="outlined"
                value={editMovie ? editMovie.rating : ""}
                onChange={(e) =>
                  setEditMovie({ ...editMovie, rating: e.target.value })
                }
              />
            </div>
            <div className={styles.blockField}>
              <p className={styles.label}>Realise year</p>
              <TextField
                {...register("release_date")}
                id="outlined-basic"
                fullWidth
                placeholder="Realise Movie"
                variant="outlined"
                value={editMovie ? editMovie.release_date : ""}
                onChange={(e) =>
                  setEditMovie({ ...editMovie, release_date: e.target.value })
                }
              />
            </div>
            <div className={styles.blockField}>
              <p className={styles.label}>Director</p>
              <TextField
                {...register("director")}
                id="outlined-basic"
                fullWidth
                placeholder="Director"
                variant="outlined"
                value={editMovie ? editMovie.director : ""}
                onChange={(e) =>
                  setEditMovie({ ...editMovie, director: e.target.value })
                }
              />
            </div>
          </div>
          <button type="submit" className={styles.btnSubmit}>
            add movie
          </button>
        </form>
      </div>
    </Dialog>
  );
}

export default ModalAddMovie;
