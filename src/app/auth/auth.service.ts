import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtResponseDto } from './login.page.component';
import { Observable } from 'rxjs';
import { RegistrationResultDto } from './register.page.component';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'http://localhost:8080';

  private http = inject(HttpClient);

  login(username: string, password: string): Observable<JwtResponseDto> {
    return this.http.post<JwtResponseDto>(
      `${this.URL}/token`,
      { username, password },
      httpOptions,
    );
  }

  register(username: string, password: string): Observable<RegistrationResultDto> {
    return this.http.post<RegistrationResultDto>(
      `${this.URL}/register`,
      { username, password },
      httpOptions,
    );
  }
}
