import { Component, OnInit, inject } from '@angular/core';
import { NavBarComponent } from "../../ui/nav-bar/nav-bar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from "../../shared/loader/loader.component";
import { FormBuilder } from '@angular/forms';
import { AlertService } from '../../core/signals/alert.service';
import { LoaderService } from '../../core/signals/loader.service';
import { AuthService } from '../../services/auth.service';
import { WaterTrackingService } from '../../services/water-tracking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-water-history',
  standalone: true,
  imports: [NavBarComponent, LoaderComponent, CommonModule ],
  templateUrl: './water-history.component.html',
  styleUrl: './water-history.component.scss'
})
export class WaterHistoryComponent implements OnInit {
  
  loaderService = inject(LoaderService);
  formBulder = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute)
  authService = inject(AuthService);
  alertService = inject(AlertService);
  waterTrackingService = inject(WaterTrackingService);
  historyData: any;

  id!: number;

  ngOnInit(): void {
    this.loaderService.isLoading.set(true);

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) this.id = +idParam;
    });
    this.getHistory();
  }

  getHistory() {

    this.waterTrackingService.getTrackingHistory(this.id).subscribe({
      next: (response) => {
        this.historyData = response;
      },
      error: (response) => {
        this.loaderService.isLoading.set(false);
        this.alertService.buildAlert.set({ type: 'error', text: 'Erro ao buscar histórico!' });
      },
      complete: () => {
        this.loaderService.isLoading.set(false);
      }
    })
  }

}
