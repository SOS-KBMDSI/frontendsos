import LoginPageContainer from "@/feature/(auth)/login/container/LoginPageContainer";
import Navbar from "@/shared/components/navbar/Navbar";
import React from "react";

const page = () => {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <LoginPageContainer />
    </main>
  );
};

export default page;
