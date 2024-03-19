import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, debounceTime, map, catchError, of } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | undefined;
  registerForm: FormGroup | undefined;
  isSignDivVisiable: boolean  = true;
  loginObj: any;

  constructor(
    private service: UserService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    })

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  loginSubmit() {
    this.service.login(this.loginForm.value).subscribe(
      (response) => {
        console.log(response);
        if (response.jwt != null) {
          alert("Hello, Your token is " + response.jwt);
          const jwtToken = response.jwt;
          localStorage.setItem('jwt', jwtToken);
          this.router.navigateByUrl("/home");
        }
      }
    )
  }

  registerSubmit(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        // Convalida il form
        if (this.registerForm?.invalid) {
          reject('Form is invalid');
          return;
        }

        // Esegui la registrazione
        const response = await this.service.register(this.registerForm.value).toPromise();

        if (response.id != null) {
          resolve(response);
        } else {
          reject('Registration failed');
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  asyncEmailValidator(UserService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const email = control.value;
  
      return UserService.checkEmailAvailability(email).pipe(
        debounceTime(300),
        map((available: boolean) => (available ? null : { emailTaken: true })),
        catchError(() => of(null))  // gestisci gli errori in modo appropriato
      );
    };
  }

}
