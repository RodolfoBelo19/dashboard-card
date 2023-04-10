import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { IAuthUserFirebase } from "../interfaces/IAuthUserFirebase";

import { auth, providerGoogle } from "../infra/firebase";

interface AuthUserProps {
  user: IAuthUserFirebase | any;
  setUser: (user: IAuthUserFirebase | any) => void;
  sign_in?: string | null;
  sign_out?: string | null;
  classNameProps?: string;
}

export const AuthUser = ({
  user,
  setUser,
  sign_in,
  sign_out,
  classNameProps,
}: AuthUserProps) => {
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
    <div className={classNameProps}>
      {!user && <button className="w-full" onClick={signIn}>{sign_in}</button>}
      {user && <button className="w-full" onClick={signOutUser}>{sign_out}</button>}
    </div>
  );
};
