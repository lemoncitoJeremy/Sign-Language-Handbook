import React, { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';

interface User {
  accountID: string;
  username: string;
  email : string;
  role : string;
}

interface UserContextType {
  userData: User | null;
  updateUser: Dispatch<SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType>({
  userData: null,
  updateUser: () => null,
});

export const useUser = () => useContext(UserContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<User | null>(() => {
    // Retrieve userData from localStorage on initial load
    const storedData = localStorage.getItem('userData');
    return storedData ? JSON.parse(storedData) : null;
  });

  // Update localStorage whenever userData changes
  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  console.log(userData)
  return (
    <UserContext.Provider value={{ userData, updateUser: setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
