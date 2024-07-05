import "./App.css";
import { Routes, Route } from "react-router";
import { Link } from "react-router-dom";
import HomePage from "./pages/home";
import SignupPage from "./pages/signup";
import SigninPage from "./pages/signin";
import ProductListPage from "./pages/productList";
import { AppDispatch, RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./store/authSlice";
import AddProductPage from "./pages/addProduct";
import UpdateProductPage from "./pages/updateProduct";
import AuthGuard from "./Guard/AuthGuard";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <div className="App">
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {!token && (
              <>
                <li>
                  <Link to="/sign-up">Sign Up</Link>
                </li>
                <li>
                  <Link to="/sign-in">Sign In</Link>
                </li>
              </>
            )}
            {token && (
              <>
                <li>
                  <Link to="/add-product">Add Products</Link>
                </li>
                <li>
                  <Link to="/product-list">Products List</Link>
                </li>
                <li onClick={() => dispatch(logout())}>Logout</li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<AuthGuard />}>
            <Route path="/add-product" element={<AddProductPage />} />
            <Route
              path="/update-product/:productId"
              element={<UpdateProductPage />}
            />
            <Route path="/product-list" element={<ProductListPage />} />
          </Route>
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/sign-in" element={<SigninPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
