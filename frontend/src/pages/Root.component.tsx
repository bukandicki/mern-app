
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Root() {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem("login") === "true") navigate("/dashboard");
    else navigate("/login");
  }, []);
  
  return (
    <>
      <header></header>
      <Outlet />
      <footer></footer>
    </>
  )
}
