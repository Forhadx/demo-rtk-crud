import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import {
  addProduct,
  fetchAll,
  updateProduct,
  viewProduct,
} from "../store/productSlice";
import { useParams } from "react-router-dom";

function UpdateProductPage() {
  let { productId } = useParams();
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, successMessage, success, product } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    dispatch(viewProduct(productId!)).unwrap();
  }, [dispatch, productId]);

  useEffect(() => {
    if (product) {
      setTitle(product?.title);
      setPrice(product?.price);
      setDescription(product?.description);
    }
  }, [product]);

  const submitProduct = (event: FormEvent) => {
    event.preventDefault();

    if (!productId || !title || !price) {
      setErrorMessage("Fill-up all data..");
      return;
    }

    dispatch(
      updateProduct({
        productId,
        title,
        price,
        description,
      })
    ).unwrap();
  };

  return (
    <div>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <form onSubmit={submitProduct} className="auth-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="enter title"
          required
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="enter price"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="enter description"
          required
        />
        <button type="submit">
          {loading ? "loading..." : "Update Product"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default UpdateProductPage;
