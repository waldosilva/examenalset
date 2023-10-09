import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';


import { Journal } from '../models/journal.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor( private http: HttpClient ) { }

  loadJournal() {
    const url = `${ base_url }/journal`;
    return this.http.get<Journal[]>( url )
              .pipe(
                map( (journals: Journal[] ) => {
                  // console.log(journals)
                  return journals
                })
              )
                // map( (resp: {ok: boolean, journals: Journal[] }) => resp.journals )

  }
  loadJournalById( id: string ) {

    const url = `${ base_url }/journal/${ id }`;
    return this.http.get<Journal>( url )
              .pipe(
                map( (journal: Journal ) => {
                  return journal
                })
              )

  }


  create( title: string,journalistId:string ) {

    const url = `${ base_url }/journal`;
    return this.http.post( url, { title,journalistId } );
  }

  update( id: string, title: string,journalistId:string   ) {

    const url = `${ base_url }/journal/${ id }`;
    return this.http.put( url, { id,title ,journalistId} );
  }


}
