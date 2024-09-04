import { NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AlertInterface } from '../../interfaces/alert.interface';
import { AlertService } from '../../core/signals/alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent implements OnInit {
  alertService = inject(AlertService);

  type: string = 'warning';
  icon: string = 'exclamation';
  text: string = 'Something unexpected happened';
  alert!: AlertInterface | null;
  
  iconMapping: { [key: string]: string } = {
    'success': 'check',
    'error': 'x',
    'warning': 'exclamation'
  };


  ngOnInit() {
    this.alert = this.alertService.buildAlert()
    if(this.alert) {
      this.buildAlert(this.alert)
      };
    this.hideAlert();
  }

  buildAlert(alert: AlertInterface): void {
    this.icon = `bi bi-shield-fill-${this.iconMapping[alert.type]}`;
    if(this.alert) {
      this.text = this.alert.text;
      this.type = this.alert.type;
    } 
  }

  hideAlert(): void {
    setTimeout(() => {
      this.alertService.buildAlert.set(null);
    }, 5000);
  }
}
