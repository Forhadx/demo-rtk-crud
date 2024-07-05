import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { deleteProduct, fetchAll } from "../store/productSlice";
import { useNavigate } from "react-router-dom";

function ProductPage() {
  let navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, products, successMessage } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    dispatch(fetchAll()).unwrap();
  }, [dispatch]);

  return (
    <div>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>loading...</p>
      ) : (
        <table>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Created</th>
            <th>Action</th>
          </tr>
          {products.map((item) => (
            <tr key={item?._id}>
              <td>{item?.title}</td>
              <td>{item?.price}</td>
              <td>{item?.description}</td>
              <td>{item?.createdAt}</td>
              <td>
                <button
                  onClick={() => navigate("/update-product/" + item?._id)}
                >
                  Edit
                </button>
                <button onClick={() => dispatch(deleteProduct(item?._id))}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </table>
      )}
    </div>
  );
}

export default ProductPage;
