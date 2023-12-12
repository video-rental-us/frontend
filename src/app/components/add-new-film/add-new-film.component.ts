import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import moment from 'moment';
import { first } from 'rxjs';
import { UserService } from '../../services/users/user.service';
import { FilmsService } from '../../services/films/films.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-new-film',
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
  templateUrl: './add-new-film.component.html',
  styleUrl: './add-new-film.component.scss',
})
export class AddNewFilmComponent {
  addNewFilmForm: FormGroup;

  constructor(private fb: FormBuilder, private filmService: FilmsService) {
    this.addNewFilmForm = this.fb.group({
      filmTitle: ['', Validators.required],
      director: ['', Validators.required],
      filmGenre: ['', Validators.required],
      finalReturnDate: ['', Validators.required],
      plannedReturnDate: ['', Validators.required],
      rating: ['', Validators.required],
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid);
    let film = form.value;
    film.videoAdditionDate = moment().format('ddd MMM DD HH:mm:ss z YYYY');
    form.valid && this.addFilm(film);
  }

  addFilm(data: any) {
    this.filmService
      .addFilm(data)
      .pipe(first())
      .subscribe(() => {
        console.log(data);
      });
  }
}
