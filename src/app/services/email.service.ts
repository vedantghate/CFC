import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendEmail(data: any){
    var email_api = "https://cfc-service.vercel.app/email";
    return this.http.post(email_api, data);
  }
}
