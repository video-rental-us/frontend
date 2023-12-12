import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { localAddress } from '../addresses';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  constructor(private http: HttpClient) {}

  getAllFilms(): any {
    return this.http.get<any>(`${localAddress}/films`);
  }

  getFilmsByTitle(searchedPhrase: string): any {
    let searchParams = new HttpParams().set('filmTitle', searchedPhrase);
    return this.http.get<any>(`${localAddress}/films/findByTitle`, {
      params: searchParams,
    });
  }

  addFilm(data: any): any {
    return this.http.post<any>(`${localAddress}/films/add-film`, data);
  }

  editFilmsByID(filmID: string, filmData: any): any {
    let editFilmIDParams = new HttpParams().set('id', filmID);
    return this.http.put<any>(`${localAddress}/films/edit-film`, filmData, {
      params: editFilmIDParams,
    });
  }

  deleteFilmsByID(filmID: string): any {
    let filmIDParams = new HttpParams().set('id', filmID);
    return this.http.delete<any>(`${localAddress}/films/delete-film`, {
      params: filmIDParams,
    });
  }

  getData(): string {
    return 'Hello, World!';
  }
}
