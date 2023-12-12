import { TestBed } from '@angular/core/testing';

import { FilmsService } from './films.service';

describe('FilmsService', () => {
  let service: FilmsService;

  it('should return the correct data', () => {
    const result = service.getData();
    expect(result).toBe('Hello, World!');
  });
});
