import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { JwtService } from './service/jwt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  title = 'jwt-angular';
  isEnter: boolean;

  constructor(private router: Router,
    private service: JwtService) {}

  ngOnInit() {
    // Aggiungi un ascoltatore agli eventi di navigazione
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Ottieni l'URL corrente dopo la navigazione
        const currentUrl = this.router.url;

        // Controlla se l'URL corrente è diverso da "login" e "register"
        this.isEnter = !['/login',].includes(currentUrl);
      }
    });
  }

  logout() {
    this.service.logout();
  }
}
