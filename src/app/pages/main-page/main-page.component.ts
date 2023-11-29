import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  standalone: true,
  imports: [
    CardComponent
  ],
})
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
