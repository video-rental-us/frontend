import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DataSource } from '@angular/cdk/collections';



@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
})
export class FilmsComponent implements OnInit {
  displayedColumns: string[] = ['rentals', 'id', 'names', 'films'];
  rentals= ['dupa']
  id= [1]
  names= ['Adam']
  films= ['Warhammer']
  dataSource?: MatTableDataSource<any>;

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>([
        this.rentals,
        this.id,
        this.names,
        this.films,
    ]);
  }
}
