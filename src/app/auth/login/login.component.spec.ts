import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AuthService } from '../auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { login } from '../auth.actions';
import { tap } from 'rxjs/operators';
import { AuthActions } from '../action-types';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store;
  const initialState = {};
  let auth: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService, HttpClient, provideMockStore({ initialState })],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot({}),
        HttpClientTestingModule,
        BrowserAnimationsModule,
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
      ],
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = fixture.debugElement.injector.get(Store);
    store.dispatch({ type: 'login', payload: ''})
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('load on #ngOnInit()"', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
  });

  it('load on #login()"', () => {
    expect(component).toBeTruthy();
    component.login();
  });

  it('if on #login() is valid"', () => {
    expect(component.form.invalid).toBeTruthy();
    expect(store).toBeDefined();
    // auth.login('abc@abc.com', '1223').pipe(
    //   tap((res) => {
    //     var mockStore = fixture.debugElement.injector.get(Store);
    //     var storeSpy = spyOn(mockStore, 'dispatch')
    //   },
    //   (error: any) => {}
    // ));
    component.login();
  });
});
