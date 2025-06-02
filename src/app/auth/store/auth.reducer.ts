import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  loggedIn: boolean;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  loggedIn: false
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, state => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSuccess, (state, { response }) => ({
    ...state,
    user: response.user,
    token: response.token,
    loading: false,
    error: null,
    loggedIn: true
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    loggedIn: false
  })),
  on(AuthActions.logout, state => ({ ...initialState })),

  on(AuthActions.refreshTokenSuccess, (state, { token }) => ({
    ...state,
    token,
    loggedIn: true
  })),

  on(AuthActions.refreshTokenFailure, state => ({
    ...initialState
  }))
);

