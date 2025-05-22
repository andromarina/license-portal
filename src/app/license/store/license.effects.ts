import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { LicenseService } from 'src/app/services/license.service';
import * as LicenseActions from './license.actions';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

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
            console.log(response.headers);         
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
  

  generateLicenseSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LicenseActions.generateLicenseSuccess),
        tap(() =>
          this.snackbar.open('License generated successfully!', 'Close', {
            duration: 3000
          })
        )
      ),
    { dispatch: false }
  );
}
