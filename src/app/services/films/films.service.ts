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

  addFilm():any{
    return this.http.post<any>(`${localAddress}`,{})
  }

  editFilmsByID(filmID: string): any{
    let editFilmIDParams = new HttpParams().set('id', filmID)
    let editFilmValues;
  }

  deleteFilmsByID(filmID: string): any {
    let filmIDParams = new HttpParams().set('id', filmID);
    return this.http.delete<any>(`${localAddress}/films/delete-film`, {
      params: filmIDParams,
    });
  }
}
