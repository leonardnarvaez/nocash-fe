import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { CrudOperations } from "./crud-operations";

export abstract class CrudService<T, ID> implements CrudOperations<T, ID> {
  private _baseUrl: string = 'https://jsonplaceholder.typicode.com';

  constructor(protected _http: HttpClient) {}

  save(t: T): Observable<T> {
    return this._http.post<T>(this._baseUrl, t);
  }

  update(id: ID, t: T): Observable<T> {
    return this._http.put<T>(this._baseUrl + "/" + id, t, {});
  }

  findOne(id: ID): Observable<T> {
    return this._http.get<T>(this._baseUrl + "/" + id);
  }

  findAll(): Observable<T[]> {
    return this._http.get<T[]>(this._baseUrl);
  }

  delete(id: ID): Observable<T> {
    return this._http.delete<T>(this._baseUrl + "/" + id);
  }

  baseUrl(endpoint: string): void {
    this._baseUrl = `${this._baseUrl}${endpoint}`;
  }

}