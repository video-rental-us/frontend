import { Component } from '@angular/core';
import { FilmsService } from '../services/films/films.service';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { first, timestamp } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { RentalService } from '../services/rentals/rental.service';
import moment from 'moment';

@Component({
  selector: 'app-rental-details',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './rental-details.component.html',
  styleUrl: './rental-details.component.scss',
})
export class RentalDetailsComponent {
  dataSource?: any;
  rents?: any;
  isOnList: boolean = false;
  rentForm!: FormGroup;
  constructor(
    private filmService: FilmsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private rentalService: RentalService
  ) {}

  title: string = '';
  date: any;
  data: any;

  ngOnInit() {
    this.title = this.route.snapshot.params['filmTitle'];

    this.rentForm = this.fb.group({
      dateControl: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      userName: [''],
      filmTitle: new FormControl({ value: this.title, disabled: true }),
    });

    return this.filmService
      .getFilmsByTitle(this.title)
      .pipe(first())
      .subscribe((data: any) => {
        this.dataSource = data;
        console.log('dataSource: ', this.dataSource);
      });
  }

  addRent() {
    console.log(this.dataSource);
    let data = {
      userData: this.rentForm.value.userName,
      filmTitle: this.title,
      rentalDate: moment().format('ddd MMM DD HH:mm:ss z YYYY'),
      plannedReturnDate: moment(this.rentForm.value.dateControl).format(
        'ddd MMM DD HH:mm:ss z YYYY'
      ),
    };
    console.log('dodano', data);
    this.rentalService.addRental(data).subscribe(() => {});
  }
}
