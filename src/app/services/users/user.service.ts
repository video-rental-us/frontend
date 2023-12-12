import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { localAddress } from '../addresses';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  addUser(data: any) {
    return this.http.post<any>(`${localAddress}/clients/add-client`, data);
  }

  deleteUser(userID: string) {
    const userParams = new HttpParams().set('id', userID);
    return this.http.delete<any>(`${localAddress}/clients/delete-client`, {
      params: userParams,
    });
  }

  editUser(userID: string, userData: any) {
    const userParams = new HttpParams().set('id', userID);
    return this.http.put<any>(`${localAddress}/clients/edit-client`, userData, {
      params: userParams,
    });
  }

  getUserByID(userID: string) {
    return this.http.get<any>(`${localAddress}/clients`);
  }

  getUserBySurname(userSurname: string) {}

  getAllUsers(): any {
    return this.http.get<any>(`${localAddress}/clients`);
  }
}
