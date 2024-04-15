import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import Header from "./components/Header/Header.jsx";
import { MyContext } from "./ MyContext.js";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing.jsx";
import MovieDetail from "./components/MovieDetail/MovieDetail.jsx";
import ModalAddMovie from "./components/ModalAddMovie/ModalAddMovie.jsx";

function App() {
  const [text, setText] = useState("");
  const [dataMovies, setDataMovies] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const alertRef = React.useRef(null);

  useEffect(() => {
    fetch("http://localhost:3000/movies/")
      .then((response) => response.json())
      .then((data) => {
        setDataMovies(data);
      });
  }, []);

  return (
    <MyContext.Provider
      value={{
        text,
        setText,
        dataMovies,
        setDataMovies,
        handleClickOpen,
      }}
    >
      <div className={styles.mainBlock}>
        <Header alertRef={alertRef} />
        <Routes>
          <Route path="/" element={<Landing alertRef={alertRef} />}></Route>
          <Route path="/movie/:id" element={<MovieDetail />}></Route>
        </Routes>
        <ModalAddMovie open={open} handleClose={handleClose} />
      </div>
    </MyContext.Provider>
  );
}

export default App;
