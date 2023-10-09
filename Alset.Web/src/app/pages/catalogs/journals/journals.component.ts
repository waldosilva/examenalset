import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';


import { Journal } from 'src/app/models/journal.model';

import { JournalService } from 'src/app/services/journal.service';
import { ModalPdfService } from './../../../services/modal-pdf.service';



@Component({
  selector: 'app-journals',
  templateUrl: './journals.component.html',
  styles: [
  ]
})
export class JournalsComponent implements OnInit, OnDestroy {

  public journals: Journal[] = [];
  public cargando: boolean = true;
  // private imgSubs: Subscription;

  constructor( private journalService: JournalService,
              private modalpdfService:ModalPdfService
     ) { }

  ngOnDestroy(): void {
    // this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarJournals();

    // this.imgSubs = this.imgSubs = this.modalImagenService.nuevaImagen
    //   .pipe(delay(100))
    //   .subscribe( img => this.cargarHospitales() );
  }

  buscar( termino: string ) {

    if ( termino.length === 0 ) {
      return this.cargarJournals();
    }

    // this.busquedasService.buscar( 'hospitales', termino )
    //     .subscribe( resp => {

    //       this.hospitales = resp;

    //     });
  }

  cargarJournals() {

    this.cargando = true;
    this.journalService.loadJournal()
        .subscribe( journals => {
          this.cargando = false;

          this.journals = journals;
        })

  }

  guardarCambios( journal: Journal ) {

    this.journalService.create( journal.title, journal.email || '' )
        .subscribe( resp => {
          Swal.fire( 'Actualizado', journal.title, 'success' );
        });

  }

  // eliminarHospital( hospital: Hospital ) {

  //   // this.hospitalService.borrarHospital( hospital._id )
  //   //     .subscribe( resp => {
  //   //       this.cargarHospitales();
  //   //       Swal.fire( 'Borrado', hospital.nombre, 'success' );
  //   //     });

  // }

  async abrirSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });

    // if( value.trim().length > 0 ) {
    //   this.hospitalService.crearHospital( value )
    //     .subscribe( (resp: any) => {
    //       this.hospitales.push( resp.hospital )
    //     })
    // }
  }

  abrirModal(journal: Journal) {

     this.modalpdfService.abrirModal( journal.id||'', journal.journalist?.id ||'', journal.pdf );

  }

}
