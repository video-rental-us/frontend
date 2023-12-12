import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { first } from 'rxjs';
import { RentalService } from '../../services/rentals/rental.service';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class RentalsComponent implements OnInit {
  constructor(private readonly rentalService: RentalService) {}
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'id',
    'userData',
    'filmTitle',
    'rentalDate',
    'plannedReturnDate',
    'finalReturnDate',
    'editRental',
    'deleteRental',
  ];
  tableData?: any;
  ngOnInit(): void {
    this.fetchRentals();
    console.log(this.tableData);
  }
  searchRentals(searchPhrase: string) {}

  fetchRentals() {
    return this.rentalService
      .getAllRentals()
      .pipe(first())
      .subscribe((rentals: any) => {
        this.tableData = rentals;
      });
  }

  sortRentals(event: Sort) {
    console.log(event, this.tableData);
    let result = this.tableData.sort((a: any, b: any) => {
      let res = 0;
      if (a[event.active] < b[event.active]) {
        res = -1;
      } else if (a[event.active] > b[event.active]) {
        res = 1;
      }

      return event.direction == 'asc' ? res : -res;
    });

    this.tableData = [...result];
  }

  editRental(rentalID: string) {}

  deleteRental(rentalID: string) {}
}
