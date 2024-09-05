import { Component, inject } from '@angular/core';
import { AuthUiComponent } from "../../ui/auth-ui/auth-ui.component";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderService } from '../../core/signals/loader.service';
import { AlertService } from '../../core/signals/alert.service';
import { AuthUserResponse } from '../../interfaces/authUser.interface';
import { AuthStateService } from '../../core/signals/auth-state.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthUiComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  authService = inject(AuthService);
  authStateService = inject(AuthStateService);

  formBulder = inject(FormBuilder);
  loaderService = inject(LoaderService);
  alertService = inject(AlertService);
  router = inject(Router);

  form = this.formBulder.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  onSubmit() {
    const user: any = this.form.getRawValue();
    this.loaderService.isLoading.set(true);
    this.authService.login(user).subscribe({
      next: (response: AuthUserResponse) => {
        this.router.navigate([`/water-tracking/${response.id}/daily`]);
        this.alertService.buildAlert.set({ type: 'success', text: response.message });
        this.authStateService.currentUserSig.set(response);
      },
      error: (response) => {
        this.loaderService.isLoading.set(false);
        this.alertService.buildAlert.set({ type: 'error', text: response.error.message });
      },
    })
  }
}
