
import { useNavigate } from "react-router-dom";
import { FormEvent, useContext, useEffect, useState } from "react";
import { UserType } from "../../lib/types";
import { AppContext } from "../Root.component";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

import "./Dashboard.styles.scss";

export default function DashboardPage() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [formType, setFormType] = useState<"CREATE" | "EDIT">("CREATE");
  const [userForm, setUserForm] = useState<Partial<UserType>>({
    email: "",
    name: ""
  });

  const { currentUser, setCurrentUser } = useContext(AppContext);
  
  const navigate = useNavigate();
    
  const formatDate = (date: string | null) => {
    return date ? new Date(date).toLocaleDateString() : "(—)";
  }

  const handleLogout = async () => {
    if (!currentUser) return;

    const response = await fetch(`${BASE_API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: currentUser.email,
      }),
    });

    if (response.ok) {
      navigate("/login");
      localStorage.removeItem("user");
      setCurrentUser(null)
    }
  }

  const fetchUsers = async (cb: (v: UserType[]) => void) => {
    const response = await fetch(`${BASE_API_URL}/users`, {
      method: "GET"
    });

    const { data }: { data: UserType[] } = await response.json();

    cb(data)
  }

  const handleDeleteUser = (id: string) => {
    fetch(`${BASE_API_URL}/users/${id}`, {
      method: "DELETE"
    }).then(() => {
      fetchUsers((data) => {
        setUsers(data);
      });
    })
  };

  const handleEditUser = async (data: UserType) => {
    setFormType("EDIT")
    setUserForm({ _id: data._id, email: data.email, name: data.name })
  };

  const handleSave = async () => {
  };

  const handleCancelEdit = () => {
    setFormType("CREATE")
    setUserForm({ email: "", name: "" })
  };

  const handleSendEmail = () => {
  };

  const handleUserForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let path = `${BASE_API_URL}/users`;

    if (formType === "EDIT") {
      path += `/${userForm._id}`
      delete userForm._id
    }
    
    fetch(path, {
      method: formType === "CREATE" ? "POST" : "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userForm }),
    }).then(() => {
      fetchUsers((data) => {
        setUsers(data);
        setUserForm({ email: "", name: "", password: "" });
        setFormType("CREATE");
      });
    });
  };

  useEffect(() => {
    fetchUsers((data) => {
      setUsers(data);
    });
  }, [])
  
  return (
    <main className="DashboardPage">
      <button className="DashboardPage__logout" onClick={handleLogout}>
        Logout
      </button>

      <section className="DashboardPage__data">
        <div>
          <h1>Create User</h1>

          <form className="DashboardPage__form" onSubmit={handleUserForm}>
            <input
              type="text"
              name="name"
              placeholder="Enter name..."
              autoComplete="off"
              value={userForm.name}
              onChange={(e) => {
                setUserForm((prev) => ({ ...prev, name: e.target.value }));
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Enter email..."
              autoComplete="off"
              value={userForm.email}
              onChange={(e) => {
                setUserForm((prev) => ({ ...prev, email: e.target.value }));
              }}
            />

            {formType === "CREATE" && (
              <input
                type="password"
                name="password"
                placeholder="Enter password..."
                autoComplete="off"
                value={userForm.password}
                onChange={(e) => {
                  setUserForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }));
                }}
              />
            )}

            <button type="submit" onClick={handleSave}>
              {formType === "EDIT" ? "Update" : "Create"}
            </button>
            {formType === "EDIT" && (
              <button type="button" onClick={handleCancelEdit}>
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        <table className="DashboardPage__users">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Last Login</th>
              <th>Last Logout</th>
              <th colSpan={3}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr>
                <td>
                  {user.name}
                  {currentUser?._id === user._id && <em> (You)</em>}
                </td>
                <td>{user.email}</td>
                <td>{formatDate(user.last_login)}</td>
                <td>{formatDate(user.last_logout)}</td>
                <td>
                  <button
                    disabled={currentUser?._id === user._id}
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    disabled={currentUser?._id === user._id}
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    disabled={currentUser?._id === user._id}
                    onClick={() => setShowPopup(true)}
                  >
                    Send Email
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
