import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "../api";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await LoginApi(username, password);
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      navigate("/search");
      alert("Login Successfull ....");
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  return (
    <>
      <h2 className="text-center text-success mt-5">Login Page</h2>
      <div className="d-flex justify-content-center align-items-center pt-5 p-4">
        <form className="w-50 pt-5 bg-body-secondary rounded-3 p-5">
          <div className="mb-3">
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <input
              name="password"
              type="text"
              placeholder="Password"
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-success w-100">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
