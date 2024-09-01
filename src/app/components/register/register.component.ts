import { Component } from '@angular/core';
import { AuthUiComponent } from "../../ui/auth-ui/auth-ui.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthUiComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
