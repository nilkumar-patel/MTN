import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { login } from './auth/auth.actions';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('AppComponent', () => {
  let dispatchSpy;
  let store: MockStore;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [provideMockStore({ initialState })],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
      ],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('load on #ngOnInit()"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    app.ngOnInit();
  });

  // it('load on #ngOnInit() if userexist', () => { 
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   store = TestBed.inject(MockStore);
  //   const userProfile = 'abc'
  //   expect(userProfile).toBe("abc")
  //   const storeSpy = spyOn(store, 'dispatch').and.callThrough();
  //   app.ngOnInit();
  //   fixture.detectChanges();
  //   expect(storeSpy).toBeDefined();
  //   expect(storeSpy).toHaveBeenCalledTimes(1);
  // });
});
