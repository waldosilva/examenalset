import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';


import { Journalist } from '../models/journalist.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class JournalistService {

  constructor( private http: HttpClient ) { }

  loadJournal() {
    const url = `${ base_url }/journalist`;
    return this.http.get<Journalist[]>( url )
              .pipe(
                map( (journals: Journalist[] ) => {
                  // console.log(journals)
                  return journals
                })
              )
                // map( (resp: {ok: boolean, journals: Journal[] }) => resp.journals )

  }
  loadJournalById( id: string ) {

    const url = `${ base_url }/journalist/${ id }`;
    return this.http.get<Journalist>( url )
              .pipe(
                map( (journal: Journalist ) => {
                  return journal
                })
              )

  }


  create( name: string,email:string  ,subscriptions?:string[]  ) {

    const url = `${ base_url }/journalist`;
    return this.http.post( url, { name,email ,subscriptions} );
  }

  update( id: string, name: string,email:string ,subscriptions?:string[]  ) {

    const url = `${ base_url }/journalist/${ id }`;
    return this.http.put( url, { id,name ,email,subscriptions} );
  }


}
