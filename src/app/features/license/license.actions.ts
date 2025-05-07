import { createAction, props } from '@ngrx/store';

export const loadLicense = createAction('[License] Load License', props<{ key: string }>());
export const loadLicenseSuccess = createAction('[License] Load Success', props<{ license: any }>());
export const loadLicenseFailure = createAction('[License] Load Failure', props<{ error: any }>());
