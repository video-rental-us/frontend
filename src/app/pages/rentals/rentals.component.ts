import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
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
    'deleteRental'
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

  editRental(rentalID: string) {}

  deleteRental(rentalID: string) {}
}
