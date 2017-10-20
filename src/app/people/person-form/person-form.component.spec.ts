import { Observable } from 'rxjs/Observable';
import { NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { PersonFormComponent } from './person-form.component';
import { PeopleService } from '../shared/people.service';
import { Person } from '../shared/person';
import { ActivatedRoute } from '@angular/router';

let fixture: ComponentFixture<PersonFormComponent>;
let comp: PersonFormComponent;
let peopleService: any;
let mockParams, mockActivatedRoute;

@Injectable()
export class ActivatedRouteStub {
  private subject = new BehaviorSubject(this.testParams);
  params = this.subject.asObservable();

  private _testParams: {};
  get testParams() { return this._testParams; }
  set testParams(params: {}) {
    this._testParams = params;
    this.subject.next(params);
  }
}

describe('Component: PersonForm', () => {

  beforeEach(async(() => {

    peopleService = jasmine.createSpyObj('peopleService',
      ['getPeople', 'getPerson', 'addPerson', 'updatePerson', 'deletePerson']
    );

    mockActivatedRoute = new ActivatedRouteStub();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PersonFormComponent],
      providers: [
        FormBuilder,
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(PersonFormComponent, {
        set: {
          providers: [
            { provide: PeopleService, useValue: peopleService },
          ]
        }
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PersonFormComponent);
        comp = fixture.componentInstance;
      });
      mockActivatedRoute.testParams = { id: undefined };
  }));

  it('should create an instance', () => {
    expect(comp.title).toEqual(undefined);
    expect(comp.person).toEqual(new Person());
    expect(comp.form).not.toBeNull();
  });

  it('should update instance after ngOnInit', fakeAsync(() => {
    fixture.componentInstance.ngOnInit();
    tick();
    expect(comp.title).toEqual('New Person');
    expect(comp.person).toEqual(new Person());
    expect(comp.form).not.toBeNull();
  }));

  it('should update instance after load person', fakeAsync(() => {
    const person = new Person();
    person.name = 'André';
    mockActivatedRoute.testParams = { id: '1' };
    peopleService.getPerson.and.callFake(() => Observable.of(person));
    fixture.detectChanges();
    fixture.componentInstance.ngOnInit();
    tick();
    fixture.whenStable().then(() => {
      expect(comp.title).toEqual('Edit Person');
      expect(comp.person).toEqual(person);
      expect(comp.form).not.toBeNull();
    });
  }));
});
