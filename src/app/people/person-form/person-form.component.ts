import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDatepicker } from '@angular/material';
import { MaterializeDirective } from "angular2-materialize";

import { Person } from '../shared/person';
import { PeopleService } from '../shared/people.service';
import { BasicValidators } from '../../shared/basic-validators';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {


  // public myDatePickerOptions: IMyDpOptions = {
  //   // other options...
  //   dateFormat: 'dd/mm/yyyy',
  // };

  form: FormGroup;
  title: string;
  person: Person = new Person();

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private peopleService: PeopleService
  ) {
    this.form = formBuilder.group({
      id: [],
      name: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(150)
      ]],
      document: ['', [
        Validators.required,
        BasicValidators.cpf
      ]],
      email: ['', [
        Validators.required,
        BasicValidators.email
      ]],
      birth: [new Date(), [
        Validators.required
      ]]
    });
  }

  ngOnInit() {
    var id = this.route.params.subscribe(params => {
      var id = params['id'];

      this.title = id ? 'Edit Person' : 'New Person';

      if (!id) {
        return;
      }
      this.form.get('id').setValue(id);

      this.peopleService.getPerson(id)
        .subscribe(
        person => {
          this.person = person;
          console.log('person.birth' + JSON.stringify(person.birth));
          // this.setDate(person.birth);
        }, response => {
          if (response.status == 404) {
            this.router.navigate(['NotFound']);
          }
        });

    });
  }

  save() {
    var result,
      personValue = this.form.value;

    console.log('personValue' + JSON.stringify(personValue));
    console.log('personValue.id' + personValue.id);
    if (personValue.id) {
      result = this.peopleService.updatePerson(personValue);
    } else {
      result = this.peopleService.addPerson(personValue);
    }

    result.subscribe(data => this.router.navigate(['people']));
  }



  setDate(birthDay: Date): void {
    // Set today date using the patchValue function
    if (birthDay) {
      let date = birthDay;
      this.form.patchValue({
        birth: {
          date: {
            year: date[0],
            month: date[1] + 1,
            day: date[2]
          }
        }
      });
    }
  }
  clearDate(): void {
    // Clear the date using the patchValue function
    this.form.patchValue({ birth: null });
  }

}
