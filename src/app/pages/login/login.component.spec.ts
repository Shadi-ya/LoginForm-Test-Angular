import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent,ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create the login form with username and password controls', () => {
    expect(component.loginForm.contains('username')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });
  it('should mark username as invalid if empty', () => {
    let username = component.loginForm.get('username');
    username?.setValue('');
    expect(username?.valid).toBeFalsy();
    expect(username?.errors?.['required']).toBeTruthy();
  });
  it('should mark username as invalid if less than 4 characters', () => {
    let username = component.loginForm.get('username');
    username?.setValue('abc');
    expect(username?.valid).toBeFalsy();
    expect(username?.errors?.['minlength']).toBeTruthy();
  });
  it('should mark password as invalid if empty', () => {
    let password = component.loginForm.get('password');
    password?.setValue('');
    expect(password?.valid).toBeFalsy();
    expect(password?.errors?.['required']).toBeTruthy();
  });

  it('should mark password as invalid if less than 6 characters', () => {
    let password = component.loginForm.get('password');
    password?.setValue('abcde');
    expect(password?.valid).toBeFalsy();
    expect(password?.errors?.['minlength']).toBeTruthy();
  });
  it('should mark form as valid if both username and password are valid', () => {
    component.loginForm.get('username')?.setValue('validUser');
    component.loginForm.get('password')?.setValue('validPassword');
    expect(component.loginForm.valid).toBeTruthy();
  });
  it('should call the login method when form is submitted', () => {
    spyOn(component, 'login');
    let button = fixture.debugElement.query(By.css('button')).nativeElement;
    component.loginForm.get('username')?.setValue('validUser');
    component.loginForm.get('password')?.setValue('validPassword');
    fixture.detectChanges();
    button.click();
    expect(component.login).toHaveBeenCalled();
  });
  it('should log form values when login is called and form is valid', () => {
    spyOn(console, 'log');
    component.loginForm.get('username')?.setValue('validUser');
    component.loginForm.get('password')?.setValue('validPassword');
    component.login();
    expect(console.log).toHaveBeenCalledWith({ username: 'validUser', password: 'validPassword' });
  });
});
