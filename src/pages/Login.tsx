import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { loginUser, registerUser } from "../services";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dogs");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      setIsLoggingIn(false);
      return;
    }
    try {
      if (isRegistering) {
        if (newPassword !== confirmPassword) {
          toast.error("Passwords do not match");
          setIsLoggingIn(false);
          return;
        }
        await registerUser(email, newPassword);
        toast.success("Account created. Please log in.");
        setIsRegistering(false);
        setEmail("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const data = await loginUser(email, password);
        toast.success("Logged in successfully");
        localStorage.setItem("token", data.token);
        navigate("/dogs");
      }
    } catch (err: any) {
      const msg = err?.response?.data?.error || "Something went wrong";
      toast.error(msg);
    }
    setIsLoggingIn(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          {isRegistering ? "Register an Account" : "Login to Your Account"}
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <InputField
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          {isRegistering ? (
            <>
              <InputField
                label="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                required
                type="password"
              />
              <InputField
                label="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
                type="password"
              />
            </>
          ) : (
            <InputField
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              type="password"
            />
          )}

          <div className="flex items-center justify-between">
            <Button
              type="submit"
              label={isRegistering ? "Create account" : "Login"}
              disabled={isLoggingIn}
              loading={isLoggingIn}
              onClick={() => {}}
              variant="primary"
            />
            <div
              className="text-sm underline cursor pointer text-blue-400 cursor-pointer"
              onClick={() => setIsRegistering(!isRegistering)}
            >
              {isRegistering
                ? "Login to an existing account"
                : "Create new account"}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
