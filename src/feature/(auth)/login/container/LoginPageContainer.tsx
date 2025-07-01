"use client";

import LoginForm from "../components/LoginForm";
import { useLoginForm } from "../hooks/useLoginForm";

export default function LoginPageContainer() {
  const formLogic = useLoginForm();

  return (
    <main className="mycontainer">
      <LoginForm {...formLogic} />
    </main>
  );
}
