import { Injectable } from '@angular/core';
import { RequestOptionsArgs } from '@angular/http';
import { Http, Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PeopleServiceMock {

  getPeople(query: string) {
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
      totalElements: 10,
      totalPages: 1
    };
    return people;
  }

  getPerson(id) {
    const person = {
      name: 'Pessoa 1'
    };
    return person;
  }

  addPerson(person) {
    return person;
  }

  updatePerson(person) {
    return person;
  }

  deletePerson(id) {
    const person = {
      id: id,
      name: 'Pessoa 1'
    };
    return person;
  }
}
