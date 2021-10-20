import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { logout } from '../auth/auth.actions';
import { Observable } from 'rxjs';
import { isLoggedIn } from '../auth/auth.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoggedIn$: Observable<boolean> | undefined;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedIn));
  }

  logout() {
    this.store.dispatch(logout());
  }
}
