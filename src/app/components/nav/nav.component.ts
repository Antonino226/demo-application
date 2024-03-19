import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  userId: number; // assumendo che userId sia un numero

  constructor(private authService: UserService) {
    this.userId = authService.getUserId(); // o ovunque tu ottenga l'ID dell'utente
  }

}
