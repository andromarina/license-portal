import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../app/auth/store/auth.actions';
import { AuthState } from './auth/store/auth.reducer';
import { AppState } from './app.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'license-portal';
  authState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
    loggedIn: false,
  };
  constructor(private store: Store<AppState>) {
    this.store.select(state => state.auth).subscribe(state => {
      console.log(state);
      this.authState = state;
    });
  }
  
  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.checkAuthOnInit());
  }
}
