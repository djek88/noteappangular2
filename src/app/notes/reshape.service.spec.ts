import { TestBed, inject } from '@angular/core/testing';

import { ReshapeService } from './reshape.service';

describe('ReshapeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReshapeService]
    });
  });

  it('should be created', inject([ReshapeService], (service: ReshapeService) => {
    expect(service).toBeTruthy();
  }));
});
