import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { Router } from '@angular/router';
import { AppState } from '../../reducers';
import { login } from '../../store/auth.actions';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  errMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
    });
  }


  login() {
    const val = this.form.value;
    if (!this.form.invalid) {
      this.auth
        .login(val.email, val.password)
        .pipe(
          tap((user) => {
            this.store.dispatch(login({ user }));
            this.router.navigateByUrl('/home');
          })
        )
        .subscribe(noop, () =>
         this.errMsg = 'Unauthorized login (Invalid username and password)'
        );
    }
  }
}
