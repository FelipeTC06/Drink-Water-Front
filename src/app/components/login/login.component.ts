import { Component } from '@angular/core';
import { AuthUiComponent } from "../../ui/auth-ui/auth-ui.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthUiComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
