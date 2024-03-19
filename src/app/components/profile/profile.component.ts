import { Component, OnInit } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/service/user.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User | undefined;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute,) { }

  private userId$: Observable<number> = this.activatedRoute.params.pipe(
    map((params: Params) => parseInt(params['id']))
  )

  user$: Observable<User> = this.userId$.pipe(
    switchMap((userId: number) => this.userService.findOne(userId))
  )

  ngOnInit(): void {
    this.userId$.subscribe(
      (userId) => {
        this.userService.getUser(userId).subscribe(
          (response) => {
            this.user = response;
          },
          (error) => {
            console.error('Failed to fetch user profile:', error);
          }
        );
      },
      (error) => {
        console.error('Failed to get user ID:', error);
      }
    );
  }

  updateProfile() {
    if (this.user) {
      // Chiamata al servizio per aggiornare le informazioni dell'utente
      this.userService.updateUser(this.user).subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
          alert('Profile updated successfully');
        },
        (error) => {
          console.error('Failed to update user profile:', error);
          alert('Failed to update profile. Please try again.');
        }
      );
    }
  }
}
