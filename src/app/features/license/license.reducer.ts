import { createReducer, on } from '@ngrx/store';
import * as LicenseActions from './license.actions';

export interface LicenseState {
  license: any;
  loading: boolean;
  error: any;
}

export const initialState: LicenseState = {
  license: null,
  loading: false,
  error: null,
};

export const licenseReducer = createReducer(
  initialState,
  on(LicenseActions.loadLicense, state => ({ ...state, loading: true })),
  on(LicenseActions.loadLicenseSuccess, (state, { license }) => ({ ...state, loading: false, license })),
  on(LicenseActions.loadLicenseFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
