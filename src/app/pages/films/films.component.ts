import { routes } from './../../app.routes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { FilmsItem } from './films-datasource';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FilmsService } from '../../services/films/films.service';
import { first } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
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
    MatCardModule,
    ReactiveFormsModule,
  ],
})
export class FilmsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<FilmsItem>;
  dataSource?: any;

  constructor(
    private filmsService: FilmsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  searchForm = this.formBuilder.group({
    searchField: '',
  });

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'id',
    'filmTitle',
    'filmGenre',
    'director',
    'plannedReturnDate',
    'rating',
    'videoAdditionDate',
    'editFilm',
    'deleteFilm',
  ];
  tableData?: any;

  ngOnInit(): void {
    this.fetchFilms();
    console.log(this.tableData);
  }

  fetchFilms(): any {
    return this.filmsService
      .getAllFilms()
      .pipe(first())
      .subscribe(
        (film: any) => (
          (this.tableData = film), console.log('fetchFilms: ', this.tableData)
        )
      );
  }

  searchFilms(searchFieldValue: string): any {
    if (searchFieldValue) {
      return this.filmsService
        .getFilmsByTitle(searchFieldValue)
        .pipe(first())
        .subscribe(
          (film: any) => (
            (this.tableData = film),
            console.log('searchFilms: ', this.tableData)
          )
        );
    } else {
      this.fetchFilms();
    }
  }

  editFilmPage(filmID: string) {
    this.router.navigate([`/films/edit-film/${filmID}`]);
  }

  editFilm(filmID: string): any {
    if (filmID) {
      this.filmsService
        .editFilmsByID(filmID)
        .pipe(first())
        .subscribe((film: any) => {
          console.log(film);
          this.fetchFilms();
        });
    } else {
      console.log(`Film ${filmID} has undefined ID!`);
    }
  }

  deleteFilm(filmID: string): any {
    if (filmID) {
      this.filmsService
        .deleteFilmsByID(filmID)
        .pipe(first())
        .subscribe((film: any) => {
          console.log(film);
          this.fetchFilms();
        });
    } else {
      console.log(`Film ${filmID} has undefined ID!`);
    }
  }
}
