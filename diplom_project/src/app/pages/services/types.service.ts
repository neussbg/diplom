import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { BaseApiService } from './base-api.service';

export interface IspitType {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class TypesService extends BaseApiService {
  constructor(private http: HttpClient) {
    super();
  }
  private typeController = this.backEndTypeController;

  getTypes(): Observable<IspitType[]> {
    return this.http.get<IspitType[]>(this.typeController);
  }

  createType(item: any): Observable<IspitType> {
    return this.http.post<IspitType>(this.typeController, item);
  }

  deleteType(id: number): Observable<IspitType> {
    const url = this.typeController;
    return this.http.delete<IspitType>(`${url}/${id}`);
  }

  updateType(id: number, item: any): Observable<IspitType> {
    return this.http.put<IspitType>(`${this.typeController}/${id}`, item);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
