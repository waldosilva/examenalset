import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Modulos
import { PagesRoutingModule } from './pages/pages.routing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { AuthRoutingModule } from './auth/auth.routing';






const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
    // AuthRoutingModule

  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }
