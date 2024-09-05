import { Component, inject, Input } from '@angular/core';
import { LoaderComponent } from "../../shared/loader/loader.component";
import { LoaderService } from '../../core/signals/loader.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-auth-ui',
  standalone: true,
  imports: [LoaderComponent, RouterLink, RouterLinkActive],
  templateUrl: './auth-ui.component.html',
  styleUrl: './auth-ui.component.scss'
})
export class AuthUiComponent {
  loaderService = inject(LoaderService);

  @Input() title: string = 'Auth';
}
