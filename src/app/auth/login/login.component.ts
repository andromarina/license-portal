import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../store/auth.actions';
import { AppState } from 'src/app/app.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  loading$;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.loading$ = this.store.select(state => state.auth.loading);
  }

  onSubmit() {
    if (this.form.valid) {
      this.store.dispatch(login(this.form.value));
    }
  }
}
