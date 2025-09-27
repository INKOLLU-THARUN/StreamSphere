import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Project.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long!");
      return;
    }

    setIsLoading(true);

    const backendPorts = ["8081", "8080"];

    for (const port of backendPorts) {
      try {
        const response = await fetch(`http://localhost:${port}/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password: password.trim(),
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(`Registration successful on port ${port}:`, result);
          setSuccessMessage("Registration successful! Redirecting to login...");

          setTimeout(() => {
            navigate("/login");
          }, 2000);

          setIsLoading(false);
          return;
        } else {
          let errorData = {};
          try {
            errorData = await response.json();
          } catch (jsonError) {
            errorData.message = "Registration failed";
          }
          setErrorMessage(errorData.message || "Registration failed");
          break;
        }
      } catch (error) {
        console.warn(`Registration failed on port ${port}:`, error);
        if (port === backendPorts[backendPorts.length - 1]) {
          setErrorMessage("Unable to connect to server. Please try again later.");
        }
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isLoading}
        />

        {errorMessage && (
          <div style={{
            color: "red",
            margin: "10px 0",
            padding: "10px",
            backgroundColor: "#ffe6e6",
            border: "1px solid #ff9999",
            borderRadius: "4px"
          }}>
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div style={{
            color: "green",
            margin: "10px 0",
            padding: "10px",
            backgroundColor: "#e6ffe6",
            border: "1px solid #99ff99",
            borderRadius: "4px"
          }}>
            {successMessage}
          </div>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{
              color: "#007bff",
              cursor: "pointer",
              textDecoration: "underline"
            }}
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
