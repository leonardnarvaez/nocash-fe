import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { CrudService } from '../api/crud-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService extends CrudService<Card, string>{

  private readonly ENDPOINT: string = "/api/card/"

  constructor(_http: HttpClient) {
    super(_http);
    super.baseUrl(this.ENDPOINT)
   }
}
