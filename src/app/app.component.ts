import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './core/signals/loader.service';
import { AlertService } from './core/signals/alert.service';
import { LoaderComponent } from "./shared/loader/loader.component";
import { AlertComponent } from "./shared/alert/alert.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'drink-water';
  loaderService = inject(LoaderService);
  alertService = inject(AlertService);
}
