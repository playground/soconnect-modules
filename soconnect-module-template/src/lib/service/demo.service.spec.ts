import { TestBed, inject } from '@angular/core/testing';

import { LibDemoService } from './demo.service';

describe('LibDemoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LibDemoService]
    });
  });

  it('should create service', inject([LibDemoService], (service: LibDemoService) => {
    expect(service).toBeTruthy();
  }));

  it('should return 42 from getMeaning', inject([LibDemoService], (service: LibDemoService) => {
    expect(service.getMeaning()).toBe(42);
  }));
});
