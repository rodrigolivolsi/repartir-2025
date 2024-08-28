import { TestBed } from '@angular/core/testing';

import { GrupoService } from './grupo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GrupoService', () => {
  let service: GrupoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    service = TestBed.inject(GrupoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
