import { TestBed, inject } from '@angular/core/testing';

import { SearchService } from './search.service';

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchService]
    });
  });

  it('should create service', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));

  it('should return 42 from getMeaning', inject([SearchService], (service: SearchService) => {
    expect(service.getMeaning()).toBe(42);
  }));
});
