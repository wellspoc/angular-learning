import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
   baseUrl="http://localhost:8080";
  constructor(private http:HttpClient) { }

  getEmployee():Observable<Employee[]>
  {
    return this.http.get<Employee[]>(`${this.baseUrl}`+"/getEmployee");
  }
  getInfo():Observable<JSON>
  {
    return this.http.get<JSON>("http://localhost:8180/getInfo");
  }
  insertEmployee(emp:Employee):Observable<Employee>
  {
    return this.http.post<Employee>(`${this.baseUrl}`+"/saveEmployee",emp);
  }
}
