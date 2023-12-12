import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/users/user.service';
import { first } from 'rxjs';
import moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-new-user',
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
  templateUrl: './add-new-user.component.html',
  styleUrl: './add-new-user.component.scss',
})
export class AddNewUserComponent {
  addNewUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.addNewUserForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      homeAddress: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  onSubmit(form: FormGroup) {
    if (!form.valid) this.snackBar.open('Podano błędne dane!', 'Okej');
    let user = form.value;
    user.registerDate = moment().format('ddd MMM DD HH:mm:ss z YYYY');
    form.valid && this.addUser(user);
  }

  addUser(data: any) {
    this.userService
      .addUser(data)
      .pipe(first())
      .subscribe(() => {
        console.log(data);
      });
  }
}
