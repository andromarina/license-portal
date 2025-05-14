export interface AuthState {
    loggedIn: boolean;
    error: string | null;
    loading: boolean;
  }
  
  export const initialState: AuthState = {
    loggedIn: false,
    error: null,
    loading: false
  };
  