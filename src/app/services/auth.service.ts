import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  expiresIn: number;
  user?: {
    id: string;
    userName: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private readonly apiUrl = `${environment.apiBaseUrl}/auth`;
  constructor(private http: HttpClient) {}

  login(model: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, model, {
      withCredentials: true // needed to receive the refresh token cookie
    });
  }

  refreshToken(): Observable<Pick<AuthResponse, 'token' | 'expiresIn'>> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getAccessToken()}`
    });

    return this.http.post<Pick<AuthResponse, 'token' | 'expiresIn'>>(
      `${this.apiUrl}/refresh-token`,
      {},
      { headers, withCredentials: true }
    );
  }

  logout(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/logout`, {}, {
      withCredentials: true
    });
  }

  private getAccessToken(): string {
    // Ideally stored in memory or a secure store
    return localStorage.getItem('accessToken') || '';
  }
}
