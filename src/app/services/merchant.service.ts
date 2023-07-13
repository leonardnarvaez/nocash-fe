import { Injectable } from '@angular/core';
import { CrudService } from '../api/crud-service';
import { Merchant } from '../models/merchant';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MerchantService extends CrudService<Merchant, string>{
  private readonly ENDPOINT: string = "/api/merchant/"
  private merchants: Merchant[] = [];

  constructor(_http: HttpClient) {
    super(_http);
    super.baseUrl(this.ENDPOINT);
    this.merchants = [];
  }
  override findAll(): Observable<Merchant[]> {
    return this._http.get<Merchant[]>(this.getBaseUrl())
      .pipe(
        tap((merchants: Merchant[]) => {
          this.merchants = merchants;
        })
      )
  }

  getMerchant(merchantId: string): Merchant | undefined {
    return this.merchants.find((merchant: Merchant) => merchant.merchantId === merchantId)
  }
}
