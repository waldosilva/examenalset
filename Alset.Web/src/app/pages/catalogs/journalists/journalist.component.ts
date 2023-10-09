import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';



import { delay } from 'rxjs/operators';



import { Journalist } from 'src/app/models/journalist.model';
import { JournalistService } from 'src/app/services/journalist.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-journalist',
  templateUrl: './journalist.component.html',
  styles: [
  ]
})
export class JournalistComponent implements OnInit {

  public journalistForm!: FormGroup;
   public subscriptions: Array<any> = [];
   public listJournalist: Journalist[] = [];
  public journalistSelected: Journalist ;


  selectedCheckboxes: number[] = [];




  constructor( private fb: FormBuilder,
               private journalistService: JournalistService,
               private router: Router,
               private activatedRoute: ActivatedRoute ) { }


subscriptionsFormArray: FormArray;



  ngOnInit(): void {



 // Crea un FormArray de suscripciones vacío
 this.subscriptionsFormArray = this.fb.array([]);




    this.activatedRoute.params
        .subscribe( ({ id }) => this.loadJournalist( id ) );
        this.loadJournalistList();



    this.journalistForm = this.fb.group({
      name: ['', Validators.required ],
      email: ['', Validators.required ],
    });



  }

  loadJournalist(id: string) {

    if ( id === 'nuevo' ) {
      return;
    }

     this.journalistService.loadJournalById( id )
      .pipe(
        delay(100)
      )
      .subscribe( journalist => {

        if ( !journalist ) {
          return this.router.navigateByUrl(`/dashboard/journalists`);
        }

        const { name, email } = journalist;
        this.journalistSelected = journalist;



        // this.journalistForm.setValue({ name, email,subcriptions :this.subcriptions });
        this.journalistForm.setValue({ name, email,subscriptions:this.subscriptions});
      });

  }


  save() {

    const { name,email,subscriptions } = this.journalistForm.value;
    const list = [];

    this.listJournalist.forEach((elemento, indice) => {
      // Verificar si el elemento en la misma posición en array2 es igual a 0
      if (subscriptions[indice] === true) {
        list.push(elemento.id); // Agregar el elemento a nuevoArray
      }
    });


    if ( this.journalistSelected ) {

      // actualizar
      const data = {
        ...this.journalistForm.value,
        id: this.journalistSelected.id
      }




      this.journalistService.update( data.id,data.name,data.email,list )
        .subscribe( resp => {
          Swal.fire('Actualizado', `${ name } actualizado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/journalists`)
        })

    } else {
      // crear

      this.journalistService.create( name,email,list )
          .subscribe( (resp: any) => {
            Swal.fire('Creado', `${ name } create succesfully`, 'success');
            this.router.navigateByUrl(`/dashboard/journalists`)
            // this.router.navigateByUrl(`/dashboard/journalist/${ resp.id }`)
        })
    }



  }
  loadJournalistList(){
  this.journalistService.loadJournal( )
      .pipe(
        delay(100)
      )
      .subscribe( journalists => {

        if ( this.journalistSelected ) {


          this.listJournalist=journalists.filter(character=>character.id !== this.journalistSelected.id);


        }else{
          this.listJournalist=journalists;
        }



      const defaultCities = [1, 2];

          const subscriptionFormGroup =

            this.fb.array(
              this.listJournalist.map(x => defaultCities.indexOf(Number(x.id)) > -1)

      )
          this.subscriptionsFormArray.push(subscriptionFormGroup);
          this.journalistForm.addControl('subscriptions',subscriptionFormGroup);
      });



}


}
