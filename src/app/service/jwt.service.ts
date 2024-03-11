import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';

const BASE_URL = ["http://localhost:8080/"]

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  
  constructor(private http: HttpClient,private router: Router) { }

  register(signRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'signup', signRequest)
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'login', loginRequest)
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
    console.log("LOCAL:" + localStorage);
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
