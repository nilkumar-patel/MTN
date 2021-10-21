import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
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
import { AppComponent } from 'src/app/app.component';
import { of } from 'rxjs';

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
      providers: [
        AuthService,
        HttpClient,
        provideMockStore({ initialState })
      ],
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
    store.dispatch({ type: 'login', payload: '' });
    // auth = new AuthService();
    auth = TestBed.get(AuthService);
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

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let email = component.form.controls['email'];
    expect(email.valid).toBeFalsy(); 
  });

  it('if on #login() is valid"', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['email'].setValue("test@test.com");
    component.form.controls['password'].setValue("123456789");
    expect(component.form.valid).toBeTruthy();
    // const user = {
    //   email: '123',
    //   password: '123'
    // }
    // let test = spyOn(auth, 'login').and.returnValue( of (user));
    const customers: any = [
      {
          email: '123',
          password: '123'
        }
    ]; 
    let test = spyOn(auth, 'login').and.returnValue(of(customers));
    
    // spyOn(auth, 'login').and.callThrough();
    // auth.login('email', 'password').pipe(
    //   tap((user) => {
    //     // this.store.dispatch(login({ user }));
    //     // this.router.navigateByUrl('/home');
    //   })
    // )
    component.login();
    fixture.detectChanges();
    expect(test).toHaveBeenCalled();
    // expect(auth.login).toHaveBeenCalledWith('123', 'password');
    // expect(component.login).toEqual({ email: '123', password: 'Product' });
    // expect(auth.login).toHaveBeenCalledTimes(1);
    
  });
});
