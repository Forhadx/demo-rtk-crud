import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { AppDispatch, RootState } from "../store";

function SigninPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const { loading, error, token } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const signupHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      setErrorMessage("Fill-up all data..");
      return;
    }
    dispatch(login({ email, password })).unwrap();
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <form onSubmit={signupHandler} className="auth-form">
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
        <button type="submit">{loading ? "loading..." : "Sign in"}</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default SigninPage;
