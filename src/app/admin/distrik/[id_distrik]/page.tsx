"use client";

import DetailDistrikContainer from "@/feature/(admin)/distrik/container/DetailDistrikContainer";
import { useParams } from "next/navigation";
import React from "react";

const DetailDistrikPage = () => {
  const params = useParams();

  const distrikId = params.id_distrik as string;

  if (!distrikId) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <main>
      <DetailDistrikContainer distrikId={distrikId} />
    </main>
  );
};

export default DetailDistrikPage;