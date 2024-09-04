import { Injectable, signal } from '@angular/core';
import { AlertInterface } from '../../interfaces/alert.interface';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  buildAlert = signal<AlertInterface | null>(null);
}
