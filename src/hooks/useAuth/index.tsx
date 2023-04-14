import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../infra/firebase";
import { IAuthUserFirebase } from "@/interfaces/IAuthUserFirebase";

export const useAuth = () => {
  const [user, setUser] = useState<IAuthUserFirebase>({} as IAuthUserFirebase);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return { user };
};
