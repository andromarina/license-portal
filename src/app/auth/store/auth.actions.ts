import { createAction, props } from '@ngrx/store';
import { LoginRequest, AuthResponse } from '../../services/auth.service';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: LoginRequest }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ response: AuthResponse }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const refreshToken = createAction('[Auth] Refresh Token');

export const refreshTokenSuccess = createAction(
  '[Auth] Refresh Token Success',
  props<{ token: string; expiresIn: number }>()
);
export const refreshTokenFailure = createAction('[Auth] Refresh Token Failure');

export const checkAuthOnInit = createAction('[Auth] Check Auth On Init');