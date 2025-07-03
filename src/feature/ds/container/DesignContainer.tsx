import React from "react";
import Buttons from "../components/Buttons";
import Accordions from "../components/Accordions";
import Checkboxes from "../components/Checkboxes";
import Dropdowns from "../components/Dropdowns";
import Badges from "../components/Badges";
import ProgressIndicators from "../components/ProgressIndicators";
import TaskCards from "../components/TaskCards";

const DesignContainer = () => {
  return (
    <main className="mycontainer mt-16 mb-16 flex flex-col gap-10">
      <h1 className="text-4xl font-bold text-center text-primary-500">Design System</h1>
      <Buttons />
      <Accordions />
      <Dropdowns />
      <Checkboxes />
      <ProgressIndicators />
      <Badges />
      <TaskCards />
    </main>
  );
};

export default DesignContainer;
