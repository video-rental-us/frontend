import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { UsersDataSource, UsersItem } from './users-datasource';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../services/users/user.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
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
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatTable) table!: MatTable<FilmsItem>;
  dataSource?: any;
  tableData?: any;

  constructor(private readonly userService: UserService) {}
  ngOnInit(): void {
    this.fetchUsers();
  }

  displayedColumns = [
    'id',
    'firstName',
    'lastName',
    'homeAddress',
    'phoneNumber',
    'registerDate',
    'editUser',
    'deleteUser',
  ];

  fetchUsers() {
    this.userService
      .getAllUsers()
      .pipe(first())
      .subscribe((users: any) => {
        this.tableData = users;
        console.log(this.tableData);
      });
  }

  sortUsers(event: Sort) {
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

  editUser(userID: string) {
    this.userService
      .editUser(userID)
      .pipe(first())
      .subscribe(() => {});
  }

  deleteUser(userID: string) {
    this.userService
      .deleteUser(userID)
      .pipe(first())
      .subscribe(() => {});
  }

  addUser() {
    this.userService
      .addUser()
      .pipe(first())
      .subscribe(() => {});
  }

  searchUser(userSurname: string) {
    this.userService.getUserBySurname(userSurname);
  }
}
