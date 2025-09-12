import React, { useEffect, useState } from "react";

import { UserDomainModel } from "../domain/UserDomainModel";

export const ProfileContainer = () => {
  const [user, setUser] = useState<UserDomainModel | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        setUser(userObj);
      } catch {
        setUser(null);
      }
    }
  }, []);

  return (
    <div className="p-8">
      <h1>Mijn account</h1>
      {user ? (
        <div className="mt-4">
          <div>
            <strong>Gebruikersnaam:</strong> {user.username}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
