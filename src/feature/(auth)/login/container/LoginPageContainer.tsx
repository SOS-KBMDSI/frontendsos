"use client";

import LoginForm from "../components/LoginForm";
import Ornament from "../components/Ornament";
import Pattern from "../components/Pattern";
import RandomStars from "../components/RandomStars";
import { useLoginForm } from "../hooks/useLoginForm";

export default function LoginPageContainer() {
  const formLogic = useLoginForm();

  return (
    <main className=" w-screen overflow-hidden h-screen bg-login ">
      <div className="w-screen h-screen mycontainer flex items-center relative justify-center">
        <LoginForm {...formLogic} />
        <Ornament />
        <Pattern />
        <RandomStars />
      </div>
    </main>
  );
}
