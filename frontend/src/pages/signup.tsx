import { FormEvent, useState } from "react";
import axios from "../lib/axios";
import {  useNavigate } from "react-router-dom";

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  const signupHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (!name || !email || !password) {
      setErrorMessage("Fill-up all data..");
      return;
    }
    try {
      setIsLoading(true);
      let response = await axios.post("/user/signup", {
        name,
        email,
        password,
      });

      if (response?.data?.success) {
        setName("");
        setEmail("");
        setPassword("");
        navigate("/sign-in");
      } else {
        setErrorMessage("Something went wrong!");
      }
      setIsLoading(false);
    } catch (err: any) {
      setErrorMessage(err.response.data.message);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={signupHandler} className="auth-form">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="enter your name"
          required
        />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">{isLoading ? "loading..." : "Sign Up"}</button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default SignupPage;
