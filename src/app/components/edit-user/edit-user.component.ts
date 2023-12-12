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
import { first } from 'rxjs';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-edit-user',
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
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent {
  editUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    console.log(data);
    let user = data.userData;
    this.editUserForm = this.fb.group({
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      homeAddress: [user.homeAddress, Validators.required],
      phoneNumber: [user.phoneNumber, Validators.required],
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid);
    let user = form.value;
    user.registerDate = this.data.userData.registerDate;
    form.valid && this.editUser(user);
  }

  editUser(data: any) {
    this.userService
      .editUser(this.data.userData.id, data)
      .pipe(first())
      .subscribe(() => {
        console.log(data);
      });
  }
}
