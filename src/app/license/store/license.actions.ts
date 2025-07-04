import { createAction, props } from '@ngrx/store';
import { Customer, Order } from 'src/app/services/customer.service';

export const loadLicense = createAction('[License] Load License', props<{ key: string }>());
export const loadLicenseSuccess = createAction('[License] Load Success', props<{ license: any }>());
export const loadLicenseFailure = createAction('[License] Load Failure', props<{ error: any }>());

export const generateLicense = createAction(
    '[License] generate License',
    props<{ order: Order }>()
  );

  export const generateMultipleLicenses = createAction(
    '[License] generate multiple Licenses',
    props<{ orders: Order[] }>()
  );

  export const generateAndSend = createAction(
    '[License] generate and send multiple Licenses',
    props<{ orders: Order[], emails: string[], numDays: number; }>()
  );
  
  export const generateLicenseSuccess = createAction(
    '[License] generate License Success'
  );
  
  export const generateLicenseFailure = createAction(
    '[License] generate License Failure',
    props<{ error: any }>()
  );  

  export const selectCustomer = createAction(
    '[Customer] Select Customer',
    props<{ customer: Customer }>()
  );