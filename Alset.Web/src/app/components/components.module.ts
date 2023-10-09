import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalPdfComponent } from './modal-Pdf/modal-pdf.component';



@NgModule({
  declarations: [
    ModalPdfComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[ModalPdfComponent]
})
export class ComponentsModule { }
