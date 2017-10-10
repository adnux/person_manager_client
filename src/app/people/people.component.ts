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
  public pageSize: number = 0;
  public pageNumber: number = 1;
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
    this.peopleService.getPeople('?size=5')
      .subscribe(data => {
        this.people = data.content;
        this.pageSize = data.size;
        this.pageNumber = data.number;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
      });
  }

  search() {
    const search = this.form.value;
    // console.log('search:' + JSON.stringify(search));

    let query = '?size=5';

    if (search.name) {
      query = query + '&name=' + search.name;
    }
    if (search.document) {
      query = query + '&document=' + search.document;
    }
    if (search.email) {
      query = query + '&email=' + search.email;
    }
    if (search.birth) {
      query = query + '&birth=' + search.birth;
    }

    this.peopleService.getPeople(query)
      .subscribe(data => {
        this.people = data.content;
        this.pageSize = data.size;
        this.pageNumber = data.number;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
      });
  }

  deletePerson(person) {
    if (confirm("Are you sure you want to delete " + person.name + "?")) {

      var index = this.people.indexOf(person);
      this.people.splice(index, 1);

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
