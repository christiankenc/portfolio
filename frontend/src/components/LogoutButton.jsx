import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    setError("");
    try {
      await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
      navigate("/");
    } catch (error) {
      setError("Logout failed, please try again.");
      console.error("Logout failed", error);
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={handleLogout} disabled={loading}>
        {loading ? "Logging out..." : "Logout"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};

export default LogoutButton;
