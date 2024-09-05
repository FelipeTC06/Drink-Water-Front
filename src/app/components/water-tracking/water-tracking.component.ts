import { RegisterIntake } from './../../interfaces/register-intake';
import { Component, inject } from '@angular/core';
import { NavBarComponent } from "../../ui/nav-bar/nav-bar.component";
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../core/signals/alert.service';
import { LoaderService } from '../../core/signals/loader.service';
import { AuthService } from '../../services/auth.service';
import { WaterTrackingService } from '../../services/water-tracking.service';
import { catchError, of, tap } from 'rxjs';
import { RegisterIntakeResponse } from '../../interfaces/register-intake-response';
import { LoaderComponent } from "../../shared/loader/loader.component";

@Component({
  selector: 'app-water-tracking',
  standalone: true,
  imports: [NavBarComponent, ReactiveFormsModule, LoaderComponent],
  templateUrl: './water-tracking.component.html',
  styleUrl: './water-tracking.component.scss'
})
export class WaterTrackingComponent {

  loaderService = inject(LoaderService);
  formBulder = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute)
  authService = inject(AuthService);
  alertService = inject(AlertService);
  waterTrackingService = inject(WaterTrackingService);

  id!: number;
  metaDia: number = 2100;
  metaRestante: number = 2100;
  metaConsumida: number = 0;
  percentualConsumido: number = 0;
  metaAtingida: boolean = false;

  consumirAguaForm = this.formBulder.group({
    quantidadeAgua: [250]
  });

  ngOnInit(): void {
    this.loaderService.isLoading.set(true);
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) this.id = +idParam;
    });
    this.atualizarProgresso();
  }

  atualizarProgresso(): void {
    this.waterTrackingService.getDailyProgress(this.id)
      .pipe(
        tap((dados: any) => {
          this.metaDia = dados.daily_goal;
          this.metaConsumida = dados.total_intake;
          this.metaRestante = dados.remaining;
          this.metaAtingida = dados.goal_achieved;
          this.percentualConsumido = (this.metaConsumida / this.metaDia) * 100;
          this.loaderService.isLoading.set(false);
        }),
        catchError(err => {
          console.error('Erro ao obter progresso diário', err);
          this.alertService.buildAlert.set({ type: 'error', text: err.error.error }); 
          this.router.navigateByUrl('/register');
          return of(null);
        })
      )
      .subscribe();
  }
  

  onSubmit() {
    this.loaderService.isLoading.set(true);

    const quantidade: number = this.consumirAguaForm.get('quantidadeAgua')?.value || 0;
    
    const intake: RegisterIntake = {
      user_id: this.id,
      intake_ml: Number(quantidade)
    };
    
    this.waterTrackingService.registerIntake(intake).subscribe({
      next: (response: RegisterIntakeResponse) => {
        this.alertService.buildAlert.set({ type: 'success', text: response.message });
      },
      error: (response) => {
        this.loaderService.isLoading.set(false);
        this.alertService.buildAlert.set({ type: 'error', text: response.error.message });
      },
      complete: () => {
        this.atualizarProgresso();
      }
    });
  }
}  
