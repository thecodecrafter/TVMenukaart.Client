import { useEffect, useState } from "react";
import { useCurrentUserContext } from "../context/useCurrentUserContext";

export const ProfileContainer = () => {
  const { user } = useCurrentUserContext();
  const [isLoading, setIsLoading] = useState(true);

  console.log(user)
  useEffect(() => {
    if (user !== null) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return <p>Loading... {user?.username}</p>;
  }

  return (
    <div className="p-8">
      <h1>Mijn account</h1>
      {user ? (
        <>
          <label className="block text-2xl font-medium leading-6 text-gray-900">
            Gebruikersnaam: {user?.username.toLowerCase()}
          </label>
          <label className="block text-2xl font-medium leading-6 text-gray-900">
            Email: {user?.email.toLowerCase()}
          </label>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
