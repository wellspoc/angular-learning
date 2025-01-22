import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rules } from './rules';
import { Rule } from './rule';

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
  getTables():Observable<String[]>
  {
    return this.http.get<String[]>("http://localhost:8180/getTables");
  }
  getColumns(TableName:String):Observable<String[]>
  {
    return this.http.get<String[]>("http://localhost:8180/getColumns?tableName="+TableName);
  }
  save(rule:Rules):Observable<number>
  {
    return this.http.post<number>("http://localhost:8180/save",rule);
  }
  fetchRuleDetails(ruleId:number):Observable<Rules>
  {
    return this.http.get<Rules>("http://localhost:8180/fetchRule?ruleId="+ruleId);
  }
  fetchRules():Observable<Rule[]>
  {
    return this.http.get<Rule[]>("http://localhost:8180/getRules");
  }
}
