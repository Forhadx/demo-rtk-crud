export interface IProduct {
  _id: string;
  title: string | "";
  description: string | "";
  price: number;
  createdAt: string;
}

export interface IProductState {
  products: IProduct[];
  product: IProduct | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  successMessage: string | null;
}

export interface IFetchAllResponse {
  data: IProduct[];
}

export interface IProductViewResponse {
  data: IProduct;
}

export interface IProductSubmit {
  title: string | "";
  description: string | "";
  price: number;
}

export interface IProductUpdate {
  productId: string;
  title: string | "";
  description: string | "";
  price: number;
}

export interface ISubmitResponse {
  data: IProduct;
  success: Boolean;
  message: string;
}
