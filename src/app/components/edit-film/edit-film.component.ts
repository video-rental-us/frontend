import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/users/user.service';
import { FilmsService } from '../../services/films/films.service';
import moment from 'moment';
import { first } from 'rxjs';

@Component({
  selector: 'app-edit-film',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-film.component.html',
  styleUrl: './edit-film.component.scss',
})
export class EditFilmComponent {
  editFilmForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private filmService: FilmsService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    console.log(data);
    let film = data.filmData;
    this.editFilmForm = this.fb.group({
      filmTitle: [film.filmTitle, Validators.required],
      director: [film.director, Validators.required],
      filmGenre: [film.filmGenre, Validators.required],
      finalReturnDate: [film.finalReturnDate, Validators.required],
      plannedReturnDate: [film.plannedReturnDate, Validators.required],
      rating: [film.rating, Validators.required],
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid);
    let film = form.value;
    film.videoAdditionDate = this.data.filmData.videoAdditionDate;
    form.valid && this.editFilm(film);
  }

  editFilm(data: any) {
    this.filmService
      .editFilmsByID(this.data.filmData.id, data)
      .pipe(first())
      .subscribe(() => {
        console.log(data);
      });
  }
}
