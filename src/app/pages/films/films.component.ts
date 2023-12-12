import { routes } from './../../app.routes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
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
import { MatDialog } from '@angular/material/dialog';
import { AddNewFilmComponent } from '../../components/add-new-film/add-new-film.component';
import { EditFilmComponent } from '../../components/edit-film/edit-film.component';

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
    private router: Router,
    public dialog: MatDialog
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

  openAddFilmDialog() {
    this.dialog.open(AddNewFilmComponent, {
      width: '300px',
    });
    this.dialog.afterAllClosed.subscribe(() => this.fetchFilms());
  }
  sortFilms(event: Sort) {
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

  searchFilms(searchPhrase: string): any {
    return this.filmsService
      .getAllFilms()
      .pipe(first())
      .subscribe((films: any) => {
        this.tableData = films.filter((film: any) =>
          film.filmTitle.includes(searchPhrase)
        );
      });
  }

  openEditFilmDialog(filmId: any) {
    this.dialog.open(EditFilmComponent, {
      width: '300px',
      data: {
        filmData: this.tableData[filmId],
      },
    });
    this.dialog.afterAllClosed.subscribe(() => this.fetchFilms());
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
