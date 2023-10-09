import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { FileUploadService } from '../../services/file-upload.service';
import { ModalPdfService } from '../../services/modal-pdf.service';

@Component({
  selector: 'app-modal-pdf',
  templateUrl: './modal-pdf.component.html',
  styles: [
  ]
})
export class ModalPdfComponent implements OnInit {

  public imagenSubir: File;
  public imgTemp: any = null;

  constructor( public modalPdfService: ModalPdfService,
               public fileUploadService: FileUploadService  ) { }

  ngOnInit(): void {
  }


  cerrarModal() {
    this.imgTemp = null;
    this.modalPdfService.cerrarModal();
  }

  cambiarImagen( file?: File ) {


    if ( !file ) {
      return this.imgTemp = null;
    }
    this.imagenSubir = file;

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  subirImagen() {

    const id   = this.modalPdfService.id;
    const tipo = this.modalPdfService.tipo;

    this.fileUploadService
      .actualizaPdf( this.imagenSubir, tipo, id )
      .then( img => {
        Swal.fire('Guardado', 'Se ha guardado el pdf', 'success');

        this.modalPdfService.newPdf.emit(img);

        this.cerrarModal();
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir el archivo', 'error');
      })

  }

}
