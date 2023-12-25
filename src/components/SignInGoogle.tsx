"use client";
import { signIn, useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import Spinner from "./Spinner";

const SignInGoogle = () => {
  const { data: session } = useSession();

  const handleLogin = () => {
    signIn("google");
  };

  if (!session?.user) {
    return (
      <button className="btn btn-primary-outline" onClick={handleLogin}>
        <FaGoogle /> Entrar com Google
      </button>
    );
  }

  return (
    <button className="btn btn-primary" onClick={handleLogin}>
      <Spinner /> Redirecionando
    </button>
  );
};

export default SignInGoogle;
