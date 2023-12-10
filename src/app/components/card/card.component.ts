import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
})
export class CardComponent implements OnInit {
  @Input() photoPath?: string;
  @Input() cardDescription?: string;
  @Input() cardTitle?: string;
  @Input() cardUsername?: string;
  @Input() link?: string;
  @Input() facbook?: string;
  @Input() github?: string

  constructor() {}

  ngOnInit() {}
}
