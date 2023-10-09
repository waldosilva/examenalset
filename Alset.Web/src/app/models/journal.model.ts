import { Journalist } from './journalist.model';

export class Journal {

  constructor(
      public title: string,
      public id?: string,
      public email?: string,
      public journalist?: Journalist,
      public pdf?: string,

  ) {}
  }
