import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthService } from '../../services/auth.service';
import { catchError, exhaustMap, interval, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()

export class AuthEffects {
  constructor(private actions$: Actions, 
    private authService: AuthService,
    private router: Router) {
      console.log('[AuthEffects] Initialized');
    }
  

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          tap(res => {
            const rawToken = res.token.startsWith('Bearer ')
            ? res.token.replace('Bearer ', '')
            : res.token;
            localStorage.setItem('accessToken', rawToken);
          }),
          map(response => AuthActions.loginSuccess({ response })),
          catchError(err =>
            of(AuthActions.loginFailure({ error: err.error?.message || 'Login failed' }))
          )
        )
      )
    )
  );

  logout$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.logout),
    mergeMap(() =>
      this.authService.logout().pipe(
        tap(() => {
          localStorage.removeItem('accessToken');
          this.router.navigate(['/']);
        }),
        map(() => ({ type: '[Auth] Logout Success' })),
        catchError(() => of({ type: '[Auth] Logout Failed' }))
      )
    )
  )
);

autoRefreshOnLogin$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.loginSuccess),
    switchMap(({ response }) => {
      const intervalMs = (response.expiresIn - 30) * 1000;
      return interval(intervalMs).pipe(map(() => AuthActions.refreshToken()));
    })
  )
);

autoRefreshOnRefresh$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.refreshTokenSuccess),
    switchMap(({ expiresIn }) => {
      const intervalMs = (expiresIn - 30) * 1000;
      return interval(intervalMs).pipe(map(() => AuthActions.refreshToken()));
    })
  )
);

refreshToken$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.refreshToken),
    tap(() => console.log('[Effect] Refresh token triggered')),
    mergeMap(() =>
      this.authService.refreshToken().pipe(
        tap(res => {
          console.log('[Effect] Refresh token success', res);
          //  const rawToken = res.token.startsWith('Bearer ')
          //   ? res.token.replace('Bearer ', '')
          //   : res.token;
          localStorage.setItem('accessToken', res.token);
        }),
        map(res =>
          AuthActions.refreshTokenSuccess({ token: res.token, expiresIn: res.expiresIn })
        ),
        catchError(error => {
          console.error('[Effect] Refresh token failed', error);
          return of(AuthActions.refreshTokenFailure());
        })
      )
    )
  )
);

checkAuthOnInit$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.checkAuthOnInit),
    mergeMap(() => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        console.log('[Effect] No access token on init');
        return of(AuthActions.logout());
      }

      return of(AuthActions.refreshToken());
    })
  )
);

}
