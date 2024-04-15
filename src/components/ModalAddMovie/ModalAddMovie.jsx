import React, { useContext, useEffect, useState } from "react";
import styles from "./modulAddMovie.module.css";
import Dialog from "@mui/material/Dialog";
import closeIcon from "../../image/close.svg";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { MyContext } from "../../ MyContext";

function ModalAddMovie({ handleClose, open }) {
  const { dataMovies, setDataMovies } = useContext(MyContext);

  const { register, handleSubmit } = useForm();

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

  const onSubmit = async (data) => {
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
          <p className={styles.title}>Add Movie</p>
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
                  required: true,
                })}
                id="outlined-basic"
                fullWidth
                placeholder="Name Movie"
                variant="outlined"
              />
            </div>
            <div className={styles.blockField}>
              <p className={styles.label}>Description</p>
              <TextField
                {...register("description", {
                  required: true,
                })}
                id="outlined-basic"
                multiline
                rows={3}
                fullWidth
                placeholder="Description Movie"
                variant="outlined"
              />
            </div>

            <div className={styles.blockField}>
              <p className={styles.label}>Image Address</p>
              <TextField
                {...register("image", {
                  required: true,
                })}
                id="outlined-basic"
                fullWidth
                placeholder="Image Address"
                variant="outlined"
              />
            </div>
            <div className={styles.blockField}>
              <p className={styles.label}>Genres</p>
              <p className={styles.warning}>
                *separate more than one genre with a comma
              </p>
              <TextField
                {...register("genre", {
                  required: true,
                })}
                id="outlined-basic"
                fullWidth
                placeholder="Genres Movie"
                variant="outlined"
              />
            </div>
            <div className={styles.blockField}>
              <p className={styles.label}>Actors</p>
              <p className={styles.warning}>
                *separate more than one actors with a comma
              </p>
              <TextField
                {...register("actors", {
                  required: true,
                })}
                id="outlined-basic"
                fullWidth
                placeholder="Actors Movie"
                variant="outlined"
              />
            </div>

            <div className={styles.blockField}>
              <p className={styles.label}>Rating 0-10</p>
              <TextField
                {...register("rating", {
                  required: true,
                })}
                id="outlined-basic"
                fullWidth
                placeholder="Rating Movie"
                variant="outlined"
              />
            </div>
            <div className={styles.blockField}>
              <p className={styles.label}>Realise year</p>
              <TextField
                {...register("release_date", {
                  required: true,
                })}
                id="outlined-basic"
                fullWidth
                placeholder="Realise Movie"
                variant="outlined"
              />
            </div>
            <div className={styles.blockField}>
              <p className={styles.label}>Director</p>
              <TextField
                {...register("director", {
                  required: true,
                })}
                id="outlined-basic"
                fullWidth
                placeholder="Director"
                variant="outlined"
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
