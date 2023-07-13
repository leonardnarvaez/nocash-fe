import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { CrudOperations } from "./crud-operations";
import { environment } from "../environments/environment";

export abstract class CrudService<T, ID> implements CrudOperations<T, ID> {
  private _baseUrl: string = environment.API_HOST;

  constructor(protected _http: HttpClient) {}

  save(t: T): Observable<T> {
    return this._http.post<T>(this._baseUrl, t);
  }

  update(id: ID, t: T): Observable<T> {
    return this._http.put<T>(this._baseUrl + "/" + id, t, {});
  }

  findOne(id: ID): Observable<T> {
    return this._http.get<T>(this._baseUrl + id);
  }

  findAll(): Observable<T[]> {
    return this._http.get<T[]>(this._baseUrl);
  }

  delete(id: ID): Observable<T> {
    return this._http.delete<T>(this._baseUrl + "/" + id);
  }

  deleteCard(id: ID): Observable<T> {
    const url = this._baseUrl.endsWith('/') ? `${this._baseUrl}${id}` : `${this._baseUrl}/${id}`;
    return this._http.delete<T>(url);
  }

  baseUrl(endpoint: string): void {
    this._baseUrl = `${this._baseUrl}${endpoint}`;
  }

  getBaseUrl(): string {
    return this._baseUrl;
  }
}
