import { AuthUserResponse } from './../../interfaces/authUser.interface';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  currentUserSig = signal<AuthUserResponse | undefined | null>(undefined);
}
