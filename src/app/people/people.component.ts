import { Component, OnInit } from '@angular/core';
import { PeopleService } from "./shared/people.service";
import { Person } from "./shared/person";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  private people: Person[] = [];
  public pageSize: number = 0;
  public pageNumber: number = 1;
  public totalElements: number = 0;
  public totalPages: number = 0;

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.peopleService.getPeople()
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

      this.peopleService.deletePerson(person.id)
        .subscribe(null,
        err => {
          alert("Could not delete person.");
          // Revert the view back to its original state
          this.people.splice(index, 0, person);
        });
    }
  }

}
