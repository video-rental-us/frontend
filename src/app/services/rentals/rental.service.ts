import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { localAddress } from '../addresses';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  constructor(private readonly http: HttpClient) {}

  getAllRentals(): any {
    return this.http.get<any>(`${localAddress}/rentals`);
  }
}
