import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private UserService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.UserService.isAuthenticated()) {
      return true;
    } else {
      // L'utente non è autenticato, reindirizza alla pagina di login
      this.router.navigate(['/login']);  // Assicurati che '/login' sia il percorso corretto per la tua pagina di login
      return false;
    }
  }
}
