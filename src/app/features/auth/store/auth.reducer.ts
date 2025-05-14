import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  loggedIn: boolean;
  error: string | null;
  loading: boolean;
}

export const initialState: AuthState = {
  loggedIn: false,
  error: null,
  loading: true,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, state => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSuccess, state => ({ ...state, loggedIn: true, loading: false })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error, loading: false }))
);



