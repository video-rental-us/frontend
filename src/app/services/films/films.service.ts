import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { localAddress } from '../addresses';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  constructor(private http: HttpClient) {}

  getAllFilms(): any {
    return this.http.get<any>(`${localAddress}/films`);
  }
}
