import { AuthState } from "./features/auth/store/auth.reducer";
import { LicenseState } from "./features/license/license.reducer";


export interface AppState {
  license: LicenseState;
  auth: AuthState;
}
