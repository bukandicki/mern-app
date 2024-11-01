import { FormEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Root.component";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

import "./Login.styles.scss";

export default function LoginPage() {
  const navigate = useNavigate();

  const { setCurrentUser } = useContext(AppContext);

  const handleFormSubmitted = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const fd = new FormData(form);

    try {
      const response = await fetch(`${BASE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: fd.get("email") as string,
          password: fd.get("password") as string,
        }),
      });

      const { data } = await response.json();

      if (response.ok) {
        navigate("/dashboard");
        localStorage.setItem("user", JSON.stringify(data));
        setCurrentUser(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="LoginPage">
      <form onSubmit={handleFormSubmitted}>
        <input
          type="email"
          autoComplete="off"
          name="email"
          placeholder="Enter email..."
        />
        <input
          type="password"
          autoComplete="off"
          name="password"
          placeholder="Enter password..."
        />

        <button type="submit">Login</button>
      </form>
    </main>
  );
}
