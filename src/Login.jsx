// src/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "./Project.css";

const Login = () => {
  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle CAPTCHA change
  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
    setErrorMessage(""); // Clear error message
  };

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if CAPTCHA is verified
    if (!captchaVerified) {
      setErrorMessage("Please verify the CAPTCHA!");
      return;
    }

    // Trim input to remove accidental spaces
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Try API authentication first
    const backendPorts = ['8081', '8080'];
    let apiSuccess = false;

    for (const port of backendPorts) {
      try {
        const response = await fetch(`http://localhost:${port}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: trimmedEmail,
            password: trimmedPassword,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log(`Login successful via API on port ${port}:`, result);
          navigate("/home");
          return;
        } else if (response.status === 401 || response.status === 403) {
          console.warn(`API authentication failed on port ${port}`);
          continue; // Try next port
        } else {
          console.warn(`HTTP error on port ${port}! status: ${response.status}`);
        }
      } catch (error) {
        console.warn(`API login failed on port ${port}:`, error);
      }
    }

    console.warn('All API attempts failed - no fallback authentication available');
    setErrorMessage("Login failed. Please check your credentials or try again later.");
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Google reCAPTCHA */}
        <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Test site key, replace with your own in production
          onChange={handleCaptchaChange}
        />

        {/* Submit button */}
        <button type="submit">Login</button>
      </form>

      {/* Error message */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Redirect to signup */}
      <p className="redirect-text">
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
