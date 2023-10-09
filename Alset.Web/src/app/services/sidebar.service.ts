import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  public menu : any[]= [];

  cargarMenu() {
    this.menu =[
        {
          titulo: 'Dashboard',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Journalists', url: 'journalists' },
            { titulo: 'Journals', url: 'journals' }
          ]
        }];

  }


  // cargarMenu() {


  }
