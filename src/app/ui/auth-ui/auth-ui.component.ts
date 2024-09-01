import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-ui',
  standalone: true,
  imports: [],
  templateUrl: './auth-ui.component.html',
  styleUrl: './auth-ui.component.scss'
})
export class AuthUiComponent {
  @Input() title: string = 'Auth';
}
