import React from "react";
import DistrikItem from "./DistrikItem";
import { Distrik } from "../type";

interface DistrikListProps {
  districts: Distrik[];
}

const DistrikList = ({ districts }: DistrikListProps) => {

  return (
    <div className="w-full h-full max-h-[60vh] overflow-y-auto pr-4 space-y-4">
      {districts.map((distrik) => (
        <DistrikItem key={distrik.id_distrik} distrik={distrik} />
      ))}
    </div>
  );
};

export default DistrikList;