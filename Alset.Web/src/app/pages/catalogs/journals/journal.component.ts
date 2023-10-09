import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { delay } from 'rxjs/operators';



import { Journal } from 'src/app/models/journal.model';
import { JournalService } from 'src/app/services/journal.service';
import { Journalist } from 'src/app/models/journalist.model';
import { JournalistService } from 'src/app/services/journalist.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styles: [
  ]
})
export class JournalComponent implements OnInit {

  public journalForm!: FormGroup;
  public journalists: Journalist[] = [];

  public journalSelected: Journal ;
  public journalistSelected: Journalist ;



  constructor( private fb: FormBuilder,
               private journalistService: JournalistService,
               private journalService: JournalService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {

    this.activatedRoute.params
        .subscribe( ({ id }) => this.loadJournal( id ) );

    this.journalForm = this.fb.group({
      title: ['', Validators.required ],
      journalist: ['', Validators.required ],

    });

     this.loadJournalists();

    this.journalForm.get('journalist')?.valueChanges
        .subscribe( journalistId => {
          if(journalistId){
          this.journalistSelected = this.journalists.find( h => h.id === journalistId )!;
        }
        })
  }

  loadJournal(id: string) {

    if ( id === 'nuevo' ) {
      return;
    }

     this.journalService.loadJournalById( id )
      .pipe(
        delay(100)
      )
      .subscribe( journal => {

        if ( !journal ) {
          return this.router.navigateByUrl(`/dashboard/journals`);
        }


        const { title,  } = journal;
        this.journalSelected = journal;
        this.journalistSelected=journal.journalist!;
        this.journalForm.setValue({ title ,journalist:journal.journalist?.id});
      });

  }

  loadJournalists() {

    this.journalistService.loadJournal()
      .subscribe( (journalists: Journalist[]) => {
        this.journalists= journalists;
      })

  }

  save() {

    const { title,journalist } = this.journalForm.value;


    const data = {
      ...this.journalForm.value,
    }

    if ( this.journalSelected ) {

      // actualizar


      this.journalService.update(  this.journalSelected.id! ,data.title,data.journalist )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ name } actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/journals`)
        })

    } else {
      // crear

      this.journalService.create( title,data.journalist )
          .subscribe( (resp: any) => {
            Swal.fire('Creado', `${ title } create succesfully`, 'success');
            // this.router.navigateByUrl(`/dashboard/journal/${ resp.journal.id }`)
            this.router.navigateByUrl(`/dashboard/journals`)
        })
    }



  }

}
