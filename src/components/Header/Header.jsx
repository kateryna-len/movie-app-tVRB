import React, { useContext } from "react";
import styles from "./header.module.css";
import { MyContext } from "../../ MyContext";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const { setSearchValue, alertRef } = useContext(MyContext);

  const { register, handleSubmit, reset } = useForm();

  const usePathname = () => {
    const location = useLocation();
    return location.pathname;
  };

  const onSubmit = (data) => {
    alertRef.current.scrollIntoView({ behavior: "smooth" });
    setSearchValue(data.search);
    reset();
  };

  return (
    <div className={styles.mainblock}>
      <Link to="/">
        <h1 className={styles.textLogo}>Honey Movie</h1>
      </Link>
      {usePathname() === "/" && (
        <div className={styles.blockSearch}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="Search movies...."
              className={styles.searchInput}
              {...register("search")}
            />
          </form>
        </div>
      )}
      <div className={styles.blockNav}></div>
    </div>
  );
}

export default Header;
