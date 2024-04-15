import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import styles from "./mainBaner.module.css";
import threeBodyMovie from "../../../image/threeBodyMovie.webp";
import minionsImg from "../../../image/minionsImg.webp";
import duneMovie from "../../../image/duneMovie.jpeg";

function MainBaner() {
  return (
    <div className={styles.mainBlock}>
      <Swiper
        navigation={true}
        speed={2000}
        modules={[Navigation]}
        slidesPerView={1}
        className="meSwiperAboutUs"
      >
        <SwiperSlide>
          <img
            src={duneMovie}
            alt="coffe"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={threeBodyMovie}
            alt="coffe"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={minionsImg}
            alt="coffe"
            width={0}
            height={0}
            sizes="100vw"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default MainBaner;
