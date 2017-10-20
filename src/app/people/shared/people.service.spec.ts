/* tslint:disable:no-unused-variable */

import { HttpModule } from '@angular/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { PeopleService } from './people.service';

describe('Service: People', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [PeopleService]
    });
  });

  it('should ...', inject([PeopleService], (service: PeopleService) => {
    expect(service).toBeTruthy();
  }));
});
