import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { useEffect, useState } from "react";
import { IAuthUserFirebase } from "../interfaces/IAuthUserFirebase";

import {
  auth,
  providerGoogle
} from "../infra/firebase";

interface AuthUserProps {
  user: IAuthUserFirebase | any;
  setUser: (user: IAuthUserFirebase | any) => void;
}

export const AuthUser = ({user, setUser} : AuthUserProps, {sign_out}: any) => {
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, providerGoogle);
      setUser(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser({});
    } catch (error) {
      console.log(error);
    }
  };

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  return (
    <>
      {!user && <button onClick={signIn}>Sign In</button>}
      {user && <button onClick={signOutUser}>{sign_out}</button>}
    </>
  );
};