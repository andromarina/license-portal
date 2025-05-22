import { createReducer, on } from '@ngrx/store';
import * as LicenseActions from './license.actions';
import { Customer } from 'src/app/services/customer.service';

export interface LicenseState {
  license: any;
  loading: boolean;
  error: any;
}

export const initialLicenseState: LicenseState = {
  license: null,
  loading: false,
  error: null,
};

export const licenseReducer = createReducer(
  initialLicenseState,
  on(LicenseActions.loadLicense, state => ({ ...state, loading: true })),
  on(LicenseActions.loadLicenseSuccess, (state, { license }) => ({ ...state, loading: false, license })),
  on(LicenseActions.loadLicenseFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export interface CustomerState {
  selectedCustomer: Customer | null;
}

export const initialCustomerState: CustomerState = {
  selectedCustomer: null
};

export const customerReducer = createReducer(
  initialCustomerState,
  on(LicenseActions.selectCustomer, (state, { customer }) => {
    console.log('Reducer: Customer selected', customer);
    return { ...state, selectedCustomer: customer };
  })
);