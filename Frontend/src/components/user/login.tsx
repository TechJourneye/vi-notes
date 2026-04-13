import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });

  const { username, password } = inputValue;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:8080/login",
        inputValue,
        { withCredentials: true }
      );

      if (data.success) {
        alert(data.message || "Login successful ✅");
        navigate("/");
      } else {
        alert(data.message || "Login failed ");
      }
    } catch (error:any) {
      alert(error.response?.data?.message || "Login failed ");
    }

    setInputValue({
      username: "",
      password: "",
    });
  };

  return (
    <div className="container">
      <div className="row offset-3">
        <h2>Login Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="col-6">
            <label>Username</label>
            <input
              className="form-control"
              type="text"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={handleOnChange}
            />
          </div>

          <div className="col-6">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </div>

          <div className="col-6 mt-2">
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </div>

          <div className="mt-2">
            <small className="me-2 text-muted">
              Don't have an account?
            </small>
            <Link to="/signup" className="btn btn-outline-success btn-sm">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}