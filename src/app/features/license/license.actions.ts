import { createAction, props } from '@ngrx/store';

export const loadLicense = createAction('[License] Load License', props<{ key: string }>());
export const loadLicenseSuccess = createAction('[License] Load Success', props<{ license: any }>());
export const loadLicenseFailure = createAction('[License] Load Failure', props<{ error: any }>());
export const renewLicense = createAction(
    '[License] Renew License',
    props<{ product: string }>()
  );
  
  export const renewLicenseSuccess = createAction(
    '[License] Renew License Success',
    props<{ product: string; renewedUntil: string }>() // date in ISO format
  );
  
  export const renewLicenseFailure = createAction(
    '[License] Renew License Failure',
    props<{ error: any }>()
  );  