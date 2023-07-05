import { Injectable } from '@angular/core';
import { CrudService } from '../api/crud-service';
import { Merchant } from '../models/merchant';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MerchantService extends CrudService<Merchant, string>{
  private readonly ENDPOINT: string = "/api/merchant/"

  constructor(_http: HttpClient) {
    super(_http);
    super.baseUrl(this.ENDPOINT);
  }

  
}
