import { useState, useEffect } from "react";
import * as Firebase from "../../infra/firebase";

const formatAuthUser = (user: any) => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState: any) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    var formattedUser = formatAuthUser(authState);
    // setAuthUser(formattedUser);
    setLoading(false);
  };

  // listen for Firebase state change
  useEffect(() => {
    // const unsubscribe = Firebase.auth().onAuthStateChanged(authStateChanged);
    // return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
  };
}
