import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { User } from '../models/user.model';
import { JwtHelperService } from "@auth0/angular-jwt";

const BASE_URL = ["http://localhost:8080/"]

@Injectable({
  providedIn: 'root'
})
export class UserService {
  findOne(userId: number): any {
    throw new Error('Method not implemented.');
  }
  constructor(private http: HttpClient,private router: Router,
    private jwtHelper: JwtHelperService) { }

  register(signRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'signup', signRequest)
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'login', loginRequest)
  }

  updateUser(user: User): Observable<any> {
    // Assume che ci sia un endpoint API per l'aggiornamento dell'utente
    return this.http.put(BASE_URL + 'update-user', user);
  }
  
  getUser(userId: number): Observable<User> {
    // Assume che ci sia un endpoint API per ottenere i dettagli dell'utente
    return this.http.get<User>(`${BASE_URL}users/${userId}`);
  }

  getUserId(): number {
    const jwtToken = localStorage.getItem('jwt');

    if (jwtToken) {
      const decodedToken = this.jwtHelper.decodeToken(jwtToken);

      if (decodedToken && decodedToken.user && decodedToken.user.id) {
        console.log("ID: decodedToken.user.id " + decodedToken.user.id);
        return decodedToken.user.id;
      }
    }

    return -1;
  }

  hello(): Observable<any> {
    return this.http.get(BASE_URL + 'api/hello', {
      headers: this.createAuthorizationHeader()
    })
  }

  checkEmailAvailability(email: string): Observable<boolean> {
    // Chiamata asincrona per verificare la disponibilità dell'email
    return this.http.get<boolean>(`${BASE_URL}/check-email?email=${email}`).pipe(
      map((response: boolean) => response),
      catchError((error) => {
        console.error('Error checking email availability:', error);
        return of(false); // Gestisci l'errore restituendo false o un valore di default
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt');
  }

  private createAuthorizationHeader() {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      console.log("JWT token found in local storage", jwtToken);
      return new HttpHeaders().set(
        "Authorization", "Bearer " + jwtToken
      )
    } else {
      console.log("JWT token not found in local storage");
    }
    return null;
  }

}
