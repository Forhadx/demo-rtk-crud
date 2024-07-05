export interface IAuthState {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface IUser {
  name: string;
  email: string;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}
