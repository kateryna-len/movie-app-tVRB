import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import Header from "./components/Header/Header.jsx";
import { MyContext } from "./ MyContext.js";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing.jsx";
import MovieDetail from "./components/MovieDetail/MovieDetail.jsx";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const alertRef = React.useRef(null);

  return (
    <MyContext.Provider
      value={{
        searchValue,
        setSearchValue,
        handleClickOpen,
        open,
        handleClose
      }}
    >
      <div className={styles.mainBlock}>
        <Header alertRef={alertRef} />
        <Routes>
          <Route path="/" element={<Landing alertRef={alertRef} />}></Route>
          <Route path="/movie/:id" element={<MovieDetail />}></Route>
        </Routes>
      </div>
    </MyContext.Provider>
  );
}

export default App;
