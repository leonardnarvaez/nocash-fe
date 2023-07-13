import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export function errorHandlerFactory(errorHandler: any) {
    return (error: HttpErrorResponse) => {
        if (error.status === 0) 
        {
          console.error('An error occurred:', error.error);
        }
        else 
        {
            errorHandler(error);
        }
        return throwError(() => new Error(''))
      }
}