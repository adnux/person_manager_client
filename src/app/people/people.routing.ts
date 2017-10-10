import { Routes, RouterModule } from '@angular/router';

import { PeopleComponent } from './people.component';
import {PersonFormComponent} from './person-form/person-form.component';

const peopleRoutes: Routes = [
  { path: 'people', component: PeopleComponent, pathMatch: 'full' },
  { path: 'people/new', component: PersonFormComponent},
  { path: 'people/:id', component: PersonFormComponent}
];

export const peopleRouting = RouterModule.forChild(peopleRoutes);
