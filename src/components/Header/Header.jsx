import React, { useContext } from "react";
import styles from "./header.module.css";
import logo from "../../image/logoMovie.jpg";
import { MyContext } from "../../ MyContext";
import iconHeart from "../../image/heartIcon.svg";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function Header({alertRef}) {
  const { text, setText } = useContext(MyContext);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alertRef.current.scrollIntoView({ behavior: 'smooth' });
    setText(data.search)
    reset()
    
  };

  return (
    <div className={styles.mainblock}>
     <Link to="/"> <h1 className={styles.textLogo}>Movie Honey</h1></Link>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="Search movies...."
            className={styles.searchInput}
            {...register("search")}
          />
        </form>
      </div>
      <div className={styles.blockNav}>
        <p className={styles.textMovie}>Movies</p>
        <div>
          <img src={iconHeart} alt="heart" />
        </div>
      </div>
    </div>
  );
}

export default Header;
