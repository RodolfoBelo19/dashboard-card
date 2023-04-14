import { useState } from "react";

import { AuthUser } from "@/components/authUser";
import { IAuthUserFirebase } from "@/interfaces/IAuthUserFirebase";

import { useAuth } from "../../hooks/useAuth";

interface IRequireAuthProps {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: IRequireAuthProps) => {
  const { user } = useAuth();

  const [userlocal, setUser] = useState<IAuthUserFirebase>(
    {} as IAuthUserFirebase
  );

  return (
    <>
      {user ? (
        children
      ) : (
        <AuthUser
          classNameProps={
            "w-full h-screen flex items-center text-white justify-center"
          }
          user={userlocal}
          setUser={setUser}
          sign_in={"login"}
        />
      )}
    </>
  );
};

export default RequireAuth;
