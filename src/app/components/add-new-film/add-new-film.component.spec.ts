import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewFilmComponent } from './add-new-film.component';

describe('AddNewFilmComponent', () => {
  let component: AddNewFilmComponent;
  let fixture: ComponentFixture<AddNewFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewFilmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
