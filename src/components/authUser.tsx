import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "firebase/auth";
import { useState } from "react";

import { 
  auth, 
  providerGoogle 
} from "../infra/firebase";

interface AuthUserProps {
  user: {
    displayName: string;
  };
}

export const AuthUser = () => {
  const [user, setUser] = useState<any>({});

  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, providerGoogle);
      setUser(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });

  return (
    <div>
      <button onClick={signIn}>Sign in</button>
      <div>{user?.displayName}</div>
    </div>
  );
};