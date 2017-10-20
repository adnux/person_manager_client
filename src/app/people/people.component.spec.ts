import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';
import { ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { PeopleComponent } from './people.component';
import { PeopleService } from './shared/people.service';

let fixture: ComponentFixture<PeopleComponent>;
let comp: PeopleComponent;
let peopleService: any;

describe('Component: People', () => {

  beforeEach(async(() => {

    peopleService = jasmine.createSpyObj('peopleService',
      ['getPeople', 'getPerson', 'addPerson', 'updatePerson', 'deletePerson']
    );

    TestBed.configureTestingModule({
      declarations: [PeopleComponent],
      providers: [
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(PeopleComponent, {
        set: {
          providers: [
            { provide: PeopleService, useValue: peopleService },
          ]
        }
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PeopleComponent);
        comp = fixture.componentInstance;
      });
  }));

  it('should create an instance', () => {
    expect(comp.people.length).toEqual(0);
    expect(comp.pageSize).toEqual(5);
    expect(comp.pageNumber).toEqual(0);
    expect(comp.totalElements).toEqual(0);
    expect(comp.totalPages).toEqual(0);
  });

  it('should update instance after ngOnInit', fakeAsync(() => {
    const people = {
      content: [
        {
          name: 'Pessoa 1'
        },
        {
          name: 'Pessoa 2'
        }
      ],
      size: 5,
      number: 1,
      totalElements: 2,
      totalPages: 1
    };
    peopleService.getPeople.and.callFake(() => Observable.of(people));

    fixture.componentInstance.ngOnInit();
    tick();
    expect(2).toEqual(comp.people.length);
    expect(5).toEqual(comp.pageSize);
    expect(1).toEqual(comp.pageNumber);
    expect(2).toEqual(comp.totalElements);
    expect(1).toEqual(comp.totalPages);
  }));
});
