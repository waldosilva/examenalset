import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




import { PagesComponent } from './pages.component';
import { JournalsComponent } from './catalogs/journals/journals.component';
import { JournalComponent } from './catalogs/journals/journal.component';
import { JournalistsComponent } from './catalogs/journalists/journalists.component';
import { JournalistComponent } from './catalogs/journalists/journalist.component';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PagesComponent,
    JournalsComponent,
    JournalComponent,
    JournalistsComponent,
    JournalistComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComponentsModule,
    SharedModule

  ],
  exports:[
    PagesComponent
  ]
})
export class PagesModule { }
