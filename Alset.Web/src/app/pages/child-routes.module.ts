import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';



// Mantenimientos
import { JournalsComponent } from './catalogs/journals/journals.component';
import { JournalComponent } from './catalogs/journals/journal.component';
import { JournalistsComponent } from './catalogs/journalists/journalists.component';
import { JournalistComponent } from './catalogs/journalists/journalist.component';



const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } },

   // Mantenimientos
   { path: 'journals', component: JournalsComponent, data: { titulo: 'Journals' }},
   { path: 'journal/:id', component: JournalComponent, data: { titulo: 'Journal' }},
   { path: 'journalists', component: JournalistsComponent, data: { titulo: 'Journals' }},
   { path: 'journalist/:id', component: JournalistComponent, data: { titulo: 'Journal' }},

]





@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
