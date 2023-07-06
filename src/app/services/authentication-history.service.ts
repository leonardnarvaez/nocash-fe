import { Injectable } from '@angular/core';
import { CrudService } from '../api/crud-service';
import { AuthenticationHistory } from '../models/authentication-history';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationHistoryService extends CrudService<AuthenticationHistory, String>{
  private readonly ENDPOINT: string = "/api/authentication-history/"
  constructor(
    private http: HttpClient
  ) {
    super(http);
    super.baseUrl(this.ENDPOINT);
  }
}
