import React, { useContext, useEffect, useState } from "react";
import styles from "./modulAddMovie.module.css";
import Dialog from "@mui/material/Dialog";
import closeIcon from "../../image/close.svg";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { MyContext } from "../../ MyContext";

function ModalAddMovie({ handleClose, open }) {
  const { dataMovies, setDataMovies, edit, filteredMoviesById, id } =
    useContext(MyContext);
  const { register, handleSubmit, reset } = useForm();
  const [editMovie, setEditMovie] = useState("");
  const [dataNew, setDataNew] = useState([]);

  console.log("sub", id);

  useEffect(() => {
    if (edit) {
      setEditMovie(filteredMoviesById[0]);
    } else {
      setEditMovie("");
    }
  }, [edit]);

  const addMovie = async (newMovie) => {
    try {
      const response = await fetch("http://localhost:3000/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });

      if (!response.ok) {
        throw new Error(`Error adding movie: ${response.statusText}`);
      }

      const newMovieData = await response.json();
      setDataMovies([...dataMovies, newMovieData]);
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  // const handlEditMovie = async (movieId, updatedMovie) => {
  //   try {
  //     const response = await fetch(`http://localhost:3000/movies/${movieId}`, { // Replace with correct endpoint
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(updatedMovie),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error editing movie: ${response.statusText}`);
  //     }

  //     const updatedMovieData = await response.json();
  //     setDataMovies(dataMovies.map((movie) => (movie.id === movieId ? updatedMovieData : movie))); // Update state with edited movie
  //   } catch (error) {
  //     console.error('Error editing movie:', error);
  //     // Display error message to user (e.g., using a toast notification)
  //   }
  // };

  const onSubmit = async (data) => {
    if (edit === false) {
      const newMovie = {
        id: Math.floor(Math.random() * 10000),
        title: data.title,
        description: data.description,
        rating: data.rating,
        release_date: data.release_date,
        genre: data.genre.split(","),
        actors: data.actors.split(","),
        director: data.director,
        image: data.image,
      };

      await addMovie(newMovie);
    }

    if (edit === true) {
      setDataNew(editMovie);
      // await handlEditMovie(11, dataNew);
      reset();
    }

    handleClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className={styles.blockMain}>
        <div className={styles.blockTitle}>
          <p className={styles.title}>{edit ? "Edit Movie" : "Add Movie"}</p>
          <img
            style={{ cursor: "pointer" }}
            onClick={() => handleClose()}
            src={closeIcon}
            alt="close icon"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className={styles.blockField}>
              <p className={styles.label}>Name</p>
              <TextField
                {...register("title", {
                  required: edit ? false : true,
                })}
                id="outlined-basic"
                fullWidth
                placeholder="Name Movie"
                variant="outlined"
                value={edit ? editMovie.title : ""}
                onChange={(e) =>
                  setEditMovie({ ...editMovie, title: e.target.value })
                }
              />
            </div>
            <div className={styles.blockField}>
              <p className={styles.label}>Description</p>
              <TextField
                {...register("description", {
                  required: edit ? false : true,
                })}
                id="outlined-basic"
                multiline
                rows={3}
                fullWidth
                placeholder="Description Movie"
                variant="outlined"
                value={edit ? editMovie.description : ""}
                onChange={(e) =>
                  setEditMovie({ ...editMovie, description: e.target.value })
                }
              />
            </div>

            <div className={styles.blockField}>
              <p className={styles.label}>Image Address</p>
              <TextField
                {...register("image", {
                  required: edit ? false : true,
                })}
                id="outlined-basic"
                fullWidth
                placeholder="Image Address"
                variant="outlined"
                value={edit ? editMovie.image : ""}
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
                {...register("genre", {
                  required: edit ? false : true,
                })}
                id="outlined-basic"
                fullWidth
                placeholder="Genres Movie"
                variant="outlined"
                value={edit ? editMovie.genre : ""}
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
                {...register("actors", {
                  required: edit ? false : true,
                })}
                id="outlined-basic"
                fullWidth
                placeholder="Actors Movie"
                variant="outlined"
                value={edit ? editMovie.actors : ""}
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
                {...register("rating", {
                  required: edit ? false : true,
                })}
                id="outlined-basic"
                fullWidth
                placeholder="Rating Movie"
                variant="outlined"
                value={edit ? editMovie.rating : ""}
                onChange={(e) =>
                  setEditMovie({ ...editMovie, rating: e.target.value })
                }
              />
            </div>
            <div className={styles.blockField}>
              <p className={styles.label}>Realise year</p>
              <TextField
                {...register("release_date", {
                  required: edit ? false : true,
                })}
                id="outlined-basic"
                fullWidth
                placeholder="Realise Movie"
                variant="outlined"
                value={edit ? editMovie.release_date : ""}
                onChange={(e) =>
                  setEditMovie({ ...editMovie, release_date: e.target.value })
                }
              />
            </div>
            <div className={styles.blockField}>
              <p className={styles.label}>Director</p>
              <TextField
                {...register("director", {
                  required: edit ? false : true,
                })}
                id="outlined-basic"
                fullWidth
                placeholder="Director"
                variant="outlined"
                value={edit ? editMovie.director : ""}
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
