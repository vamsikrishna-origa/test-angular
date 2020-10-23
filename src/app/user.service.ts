import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = "http://localhost:8000/";
  constructor(private httpClient: HttpClient) { }
  
  fetchUser(id): Observable<any> {
    let apiUrl = this.baseUrl + "fetch/" + id;
    return this.httpClient.get<any>(apiUrl).pipe(map(user => user));
  }

  saveUser(data): Observable<any> {
    let apiUrl = this.baseUrl + "create";
    return this.httpClient.post<any>(apiUrl, data).pipe(map(user => user));
  }

  updateUser(id, data): Observable<any> {
    let apiUrl = this.baseUrl + "update/" + id;
    return this.httpClient.put<any>(apiUrl, data).pipe(map(user => user));
  }

  deleteUser(id): Observable<any> {
    let apiUrl = this.baseUrl + "delete/" + id;
    return this.httpClient.delete<any>(apiUrl).pipe(map(user => user));
  }
  upload(data, options): Observable<any> {
    let apiUrl = this.baseUrl + "uploads";
    return this.httpClient.post<any>(apiUrl, data, options).pipe(map(file => file));
  }
 }
