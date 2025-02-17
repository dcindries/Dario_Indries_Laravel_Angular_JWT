import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from
  './../../shared/auth.service';
import { FormBuilder, FormGroup } from
  '@angular/forms';
import { TokenService } from
  '../../shared/token.service';
import { AuthStateService } from
  '../../shared/auth-state.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent
  implements OnInit {
  loginForm: FormGroup;
  errors: any = null;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService:
      AuthService,
    private token: TokenService,
    private authState:
      AuthStateService
  ) {
    this.loginForm = this.fb.group({
      email: [],
      password: [],
    });
  }
  ngOnInit() { }
  onSubmit(): void {
    console.log('Formulario enviado', this.loginForm.value);
    if (this.loginForm.valid) {
      this.authService.signin(this.loginForm.value).subscribe({
        next: (result) => {
          console.log('Respuesta recibida:', result);
          this.responseHandler(result);
        },
        error: (error) => {
          console.error('Error en la petición:', error);
          this.errors = error.error;
        },
        complete: () => {
          console.log('Petición completada');
          this.authState.setAuthState(true);
          this.loginForm.reset();
          this.router.navigate(['/peticion']);

        }
      });
    } else {
      console.log('El formulario no es válido', this.loginForm.errors);
    }
  }
  
  // Handle response
  responseHandler(data: any) {
    this.token.handleData(data.access_token);
  }
}
