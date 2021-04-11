import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class UserService {
  public API_ENDPOINT = environment.apiUrl + "/api/";
  constructor(private httpClient: HttpClient) {}
  public login(data: any) {
    return this.httpClient
      .post(this.API_ENDPOINT + "/user/login", data)
      .pipe(catchError(this.handleError));
  }
  public register(data: any) {
    return this.httpClient
      .post(this.API_ENDPOINT + "/user/register", data)
      .pipe(catchError(this.handleError));
  }
  public allClasses(data: any) {
    return this.httpClient
      .get(this.API_ENDPOINT + "/class/list", data)
      .pipe(catchError(this.handleError));
  }
  handleError(error) {
    let errorMessage = "";

    if (error.error instanceof ErrorEvent) {
      // client-side error

      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error

      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    window.alert(errorMessage);

    return throwError(errorMessage);
  }
}
