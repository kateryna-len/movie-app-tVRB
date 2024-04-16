import React from "react";
import MainBaner from "./MainBaner/MainBaner";
import Movies from "./Movies/Movies";

function Landing({ alertRef }) {
  return (
    <>
      <MainBaner />
      <Movies/>
    </>
  );
}

export default Landing;
