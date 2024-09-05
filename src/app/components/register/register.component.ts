import { Component, inject } from '@angular/core';
import { AuthUiComponent } from "../../ui/auth-ui/auth-ui.component";
import { AlertService } from '../../core/signals/alert.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoaderService } from '../../core/signals/loader.service';
import { UserRegister } from '../../interfaces/user-register.interface';
import { AuthUserResponse } from '../../interfaces/authUser.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthUiComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  loaderService = inject(LoaderService);
  formBulder = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  alertService = inject(AlertService);

  form = this.formBulder.nonNullable.group({
    fullname: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    weight: [0, Validators.required],
  })

  onSubmit() {
    const isFormValid = this.form.valid;
    if(!isFormValid) return this.alertService.buildAlert.set({type: 'error', text: 'Registro feito incorretamente!'});
    this.loaderService.isLoading.set(true);
    const user: UserRegister = this.form.getRawValue();
    this.authService.register(user).subscribe({
      next: (response: AuthUserResponse) => {
        this.alertService.buildAlert.set({type: 'success', text: response.message});
        this.router.navigateByUrl('/login');
      },
      error: (response) => {
        this.loaderService.isLoading.set(false);
        this.alertService.buildAlert.set({type: 'error', text: response.error.text});
      },
      complete: () => {
        this.loaderService.isLoading.set(false);
      }
    })
  }
}
