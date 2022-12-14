import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interfaces/auth-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL: String = environment.baseURL;

  private _user!: User;

  constructor(private http: HttpClient) {}

  get getterUser() {
    return { ...this._user };
  }

  login(email: string, password: string) {
    const url = `${this.baseURL}/auth`;

    const body: any = { email, password };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap((response) => {
        if (response.ok) {
          localStorage.setItem('token', response.token!);
        }
      }),
      map((response) => response.ok),
      catchError((error) => of(error.error.message))
    );
  }

  tokenValidation(): Observable<boolean> {
    const url = `${this.baseURL}/auth/renew`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map((response) => {
        this._user = {
          name: response.name!,
          uid: response.uid!,
          email: response.email!,
        };
        return response.ok;
      }),
      catchError((error) => of(false))
    );
  }

  logOut() {
    localStorage.clear();
  }

  registerUser(name: string, email: string, password: string) {
    const url = `${this.baseURL}/auth/new`;

    const body: any = { name, email, password };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap((response) => {
        if (response.ok) {
          console.log('ok');
        }
      }),
      map((response) => response.ok),
      catchError((error) => of(error.error.message))
    );
  }
}
