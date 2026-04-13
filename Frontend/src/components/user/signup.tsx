import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { email, password, username } = inputValue;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!email || !password || !username) {
      alert("All fields are required ");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:8080/signup",
        inputValue,
        { withCredentials: true }
      );

      if (data.success) {
        alert(data.message || "Signup successful ✅");
        navigate("/");
      } else {
        alert(data.message || "Signup failed ");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong ");
    }

    setInputValue({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="container">
      <div className="row offset-3">
        <h2>Signup Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="col-6">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </div>

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
              Sign Up
            </button>
          </div>

          <div className="mt-2">
            <small className="me-2 text-muted">
              Already have an account?
            </small>
            <Link to="/login" className="btn btn-outline-success btn-sm">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}