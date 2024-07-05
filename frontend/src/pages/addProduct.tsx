import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { addProduct, fetchAll } from "../store/productSlice";

function AddProductPage() {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, successMessage, success } = useSelector(
    (state: RootState) => state.product
  );

  const submitProduct = (event: FormEvent) => {
    event.preventDefault();

    if (!title || !price) {
      setErrorMessage("Fill-up all data..");
      return;
    }

    dispatch(
      addProduct({
        title,
        price,
        description,
      })
    ).unwrap();

    setTitle("");
    setPrice(0);
    setDescription("");
  };

  return (
    <div>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={submitProduct} className="auth-form">
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="enter title"
          required
        />
        <input
          type="number"
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="enter price"
          required
        />
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="enter description"
          required
        />
        <button type="submit">{loading ? "loading..." : "Add Product"}</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default AddProductPage;
