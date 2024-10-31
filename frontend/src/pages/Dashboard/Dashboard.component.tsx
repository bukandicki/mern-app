
import { useNavigate } from "react-router-dom";
import "./Dashboard.styles.scss";

export default function DashboardPage() {
  const navigate = useNavigate();
  
  const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
  
  const handleLogout = async () => {
    const userData = localStorage.getItem("user");

    if (!userData) return

    
    const response = await fetch(`${BASE_API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: JSON.parse(userData).email as string,
      }),
    });

    if (response.ok) {
      navigate("/login");
      localStorage.removeItem("user");
      localStorage.setItem("login", "false");
    }
    
  }
  
  return (
    <main className="DashboardPage">
      <button onClick={handleLogout}>Logout</button>
    </main>
  )
}
