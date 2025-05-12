import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';

constructor(
  private actions$: Actions,
  private api: LicenseApiService,
  private snackbar: MatSnackBar
) {}

renewLicense$ = createEffect(() =>
  this.actions$.pipe(
    ofType(LicenseActions.renewLicense),
    switchMap(({ product }) =>
      of(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()).pipe(
        delay(1000),
        map(renewedUntil =>
          LicenseActions.renewLicenseSuccess({ product, renewedUntil })
        ),
        catchError(error =>
          of(LicenseActions.renewLicenseFailure({ error }))
        )
      )
    )
  )
);

renewLicenseSuccess$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(LicenseActions.renewLicenseSuccess),
      tap(() =>
        this.snackbar.open('License renewed successfully!', 'Close', {
          duration: 3000
        })
      )
    ),
  { dispatch: false }
);
