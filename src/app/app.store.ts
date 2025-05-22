import { AuthState } from "./auth/store/auth.reducer";
import { LicenseState } from "./license/store/license.reducer";


export interface AppState {
  license: LicenseState;
  auth: AuthState;
}
