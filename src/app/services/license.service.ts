import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root' // makes this service injectable app-wide
})
export class LicenseService {
  private readonly apiUrl = `${environment.apiBaseUrl}/license`;
  constructor(private http: HttpClient) { }

  generateLicense(orderId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/generateLicense?orderId=` + orderId, {responseType: 'blob'});   
  }

  generateMultipleLicense(orderIds: number[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/generateMultipleLicenses`, {orderIds : orderIds}, 
      { responseType: 'blob' as 'json',
        observe: 'response'});   
  }

  generateAndSendLicenses(orderIds: number[], emails: string[]): Observable<any> {
      return this.http.post(`${this.apiUrl}/generateAndSend`, {orderIds : orderIds, emails: emails});   
  }
}