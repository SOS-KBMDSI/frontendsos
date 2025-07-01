import React from "react";
import Buttons from "../components/Buttons";
import Inputs from "../components/Inputs";

const DesignContainer = () => {
  return (
    <main className="mycontainer mt-30 flex flex-col gap-8">
      <Buttons />
      <Inputs />
    </main>
  );
};

export default DesignContainer;
