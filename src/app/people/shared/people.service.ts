import { Injectable } from '@angular/core';
import { RequestOptionsArgs } from '@angular/http';
import { Http, Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class PeopleService {

  private url: string = "http://localhost:8090/api/people";

  private options: RequestOptionsArgs = { headers: new Headers({ 'Content-Type': 'Application/json' }) };

  constructor(private http: Http) { }

  getPeople(query: string) {
    // console.log('iniciando:' + this.url);
    return this.http.get(this.url + query)
      .map(res => res.json());
    // .map(data => data.content);
  }

  getPerson(id) {
    return this.http.get(this.getPersonUrl(id))
      .map(res => res.json());
  }

  addPerson(person) {
    return this.http.post(this.url, JSON.stringify(person), this.options)
    .map(res => {
      return res.json();
    });
  }

  updatePerson(person) {
    return this.http.put(this.getPersonUrl(person.id), JSON.stringify(person), this.options)
      .map(res => {
        return res.json();
      });
  }

  deletePerson(id) {
    return this.http.delete(this.getPersonUrl(id));
  }

  private getPersonUrl(id) {
    return this.url + "/" + id;
  }
}
