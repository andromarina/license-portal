import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CustomerState } from "./license.reducer";

export const selectCustomerState = createFeatureSelector<CustomerState>('customer');

export const getSelectedCustomer = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.selectedCustomer
);