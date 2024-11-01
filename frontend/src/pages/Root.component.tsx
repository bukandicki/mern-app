import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserType } from "../lib/types";

export const AppContext = createContext<{
  currentUser: UserType | null;
  setCurrentUser: Dispatch<SetStateAction<UserType | null>>;
}>({
  currentUser: null,
  setCurrentUser: () => {},
});

export default function Root() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      navigate("/dashboard");
      setCurrentUser(
        JSON.parse(localStorage.getItem("user") as string) as UserType
      );
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <header></header>
      <AppContext.Provider value={{ currentUser, setCurrentUser }}>
        <Outlet />
      </AppContext.Provider>
      <footer></footer>
    </>
  );
}
