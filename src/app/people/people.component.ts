import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeopleService } from './shared/people.service';
import { Person } from './shared/person';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  public people: Person[] = [];
  public pageSize: number = 5;
  public pageNumber: number = 0;
  public totalElements: number = 0;
  public totalPages: number = 0;

  public form: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private peopleService: PeopleService) {
    this.form = formBuilder.group({
      //id: [],
      name: [],
      document: [],
      email: [],
      birth: []
    });
  }

  ngOnInit() {
    this.search();
  }

  search() {
    this.peopleService.getPeople(this.buildQuery())
      .subscribe(data => {
        this.people = data.content;
        this.pageSize = data.size;
        this.pageNumber = data.number;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
      });
    // "totalPages":2,"totalElements":7,"last":false,"sort":null,"first":true,"number":0,"size":5,"numberOfElements":5
  }

  buildQuery() {
    const search = this.form.value;
    // console.log('search:' + JSON.stringify(search));

    let query = `?size=${this.pageSize}`;

    if (this.pageNumber) {
      query += `&page=${this.pageNumber - 1}`;
    }
    if (search.name) {
      query += `&name=${search.name}`;
    }
    if (search.document) {
      query += `&document=${search.document}`;
    }
    if (search.email) {
      query += `&email=${search.email}`;
    }
    if (search.birth) {
      query += `&birth=${search.birth}`;
    }
    return query;
  }

  goPage = (pageNumber: number) => {
    console.log('goPage:' + pageNumber);
    this.pageNumber = pageNumber;
    this.search();
  }

  deletePerson(person) {
    if (confirm('Are you sure you want to delete ' + person.name + '?')) {

      // var index = this.people.indexOf(person);
      // this.people.splice(index, 1);

      this.peopleService.deletePerson(person.id);
      // .subscribe(null,
      // err => {
      //   alert("Could not delete person.");
      //   // Revert the view back to its original state
      //   this.people.splice(index, 0, person);
      // });
    }
  }

}
