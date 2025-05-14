import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, switchMap, catchError, tap, exhaustMap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, 
    private router: Router,
    private snack: MatSnackBar) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ email, password }) => {
        if (email === 'admin@example.com' && password === 'password') {
          return of(AuthActions.loginSuccess());
        } else {
          return of(AuthActions.loginFailure({ error: 'Invalid credentials' }));
        }
      })
    )
  );

  redirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        
        tap(() => { 
            localStorage.setItem('auth', 'true'),
            this.router.navigate(['/license'])})
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(({ error }) => {
          this.snack.open(`Login failed: ${error}`, 'Close', {
            duration: 3000,
            panelClass: 'snackbar-error'
          });
        })
      ),
    { dispatch: false }
  );

}
