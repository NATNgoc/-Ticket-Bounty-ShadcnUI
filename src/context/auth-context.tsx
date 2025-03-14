"use client";

import { isUserLoggedIn } from "@/action/cookie";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext({
  isLogin:
    false /* eslint-disable-next-line @typescript-eslint/no-unused-vars */,
  updateLoginStatus: (isLogin: boolean) => {},
  isFetched: false,
});

export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isFetched, setFetchStatus] = useState(false);
  const updateLoginStatus = useCallback((isLogin: boolean) => {
    setIsLogin(isLogin);
    setFetchStatus(true);
  }, []);

  // Initialize auth state when provider mounts
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await isUserLoggedIn();
        updateLoginStatus(isLoggedIn);
      } catch (error) {
        console.error("Error checking login status:", error);
        updateLoginStatus(false);
      }
    };

    checkLoginStatus();
  }, [updateLoginStatus]);

  return (
    <AuthContext.Provider value={{ isLogin, updateLoginStatus, isFetched }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
