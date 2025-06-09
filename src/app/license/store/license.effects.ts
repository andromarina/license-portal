import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, ignoreElements, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { LicenseService } from 'src/app/services/license.service';
import * as LicenseActions from './license.actions';
import { from, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class LicenseEffects {
  constructor(
    private actions$: Actions,
    private api: LicenseService,
    private snackbar: MatSnackBar
  ) { }

  generateLicense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LicenseActions.generateLicense),
      switchMap(({ order }) =>

        this.api.generateLicense(order.iD_Order).pipe(
          tap(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = order.product.product_CustomInfo.licenseFileBinaryName;
            a.click();
            window.URL.revokeObjectURL(url);
          }),
          map(() =>
            LicenseActions.generateLicenseSuccess()
          ),
          catchError(error =>
            of(LicenseActions.generateLicenseFailure({ error }))
          )
        )
      )
    )
  );

   generateMultipleLicenses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LicenseActions.generateMultipleLicenses),
      switchMap(({ orders }) =>

        this.api.generateMultipleLicense(orders.map(o => o.iD_Order)).pipe(
          tap(response => {
            
            const blob = response.body!;       
            const contentDisp = response.headers.get('Content-Disposition') || '';
            
            const match = /filename="?([^";\r\n]+)"?/i.exec(contentDisp);
            const filename = match && match[1] ? match[1] : 'download.zip';
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
          }),
          map(() =>
            LicenseActions.generateLicenseSuccess()
          ),
          catchError(error =>
            of(LicenseActions.generateLicenseFailure({ error }))
          )
        )
      )
    )
  );

  generateAndSend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LicenseActions.generateAndSend),
      switchMap(({ orders, emails, numDays  }) =>

        this.api.generateAndSendLicenses(orders.map(o => o.iD_Order), emails, numDays).pipe(
          
          map(() =>
            LicenseActions.generateLicenseSuccess()
          ),
          catchError(error =>
            of(LicenseActions.generateLicenseFailure({ error }))
          )
        )
      )
    )
  );
  

  generateLicenseSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LicenseActions.generateLicenseSuccess),
        tap(() =>
          this.snackbar.open('Operation completed successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          })
        )
      ),
    { dispatch: false }
  );

  generateLicenseFailure$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(LicenseActions.generateLicenseFailure),
      mergeMap(err => {
        const errorBlob: Blob = err?.error?.error ?? err?.error;

        return from(errorBlob.text()).pipe(
          map(text => {
            try {
              const body = JSON.parse(text);
              return body?.error?.message ?? body?.message ?? text;
            } catch {
              return text;
            }
          }),
          tap(userMsg =>
            this.snackbar.open(`Operation failed! ${userMsg}`, 'Close', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            })
          ),
          ignoreElements()
        );
      })
    ),
  { dispatch: false }
);
}
