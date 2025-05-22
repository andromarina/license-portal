import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { AppState } from 'src/app/app.store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(state => state.auth.loggedIn).pipe(
      map(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
}
