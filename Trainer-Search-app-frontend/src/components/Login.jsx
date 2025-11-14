import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!username || !password) {
        throw new Error("Username and password are required");
      }

      const data = await loginUser(username, password);

      if (data.access && data.refresh) {
        // Store tokens in localStorage
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        localStorage.setItem("username", username);

        setUsername("");
        setPassword("");
        navigate("/trainers");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      const errorMessage = err.message || "Login failed. Please try again.";
      setError(errorMessage);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className=" d-flex justify-content-center align-items-center vh-100 ">
        <div className=" p-4 bg-body-secondary rounded-3">
          <h3 className="mb-4">Trainer Search App</h3>

          {error && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              {error}
              <button
                type="button"
                className="btn-close"
                onClick={() => setError("")}
              ></button>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4 ">
              <input
                className="form-control"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              ></input>
            </div>

            <div className="mb-2 ">
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              ></input>
            </div>

            <br></br>
            <button
              className="btn btn-success"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* <div className="mt-3 text-muted small">
            <p>Demo Credentials:</p>
            <p>
              Username: <strong>ritesh</strong>
            </p>
            <p>
              Password: <strong>123456</strong>
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
};
