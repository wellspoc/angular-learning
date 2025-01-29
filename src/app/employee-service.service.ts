import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rules } from './rules';
import { Rule } from './rule';
import { catchError, retry } from 'rxjs/operators';
import { Task } from './task';
import { TaskDetail } from './task-detail';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly baseUrl = "http://localhost:8180/api";

  constructor(private http: HttpClient) {}

  private get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${url}`, { params })
      .pipe(
        retry(2),  // Retries the request twice in case of failure
        catchError(this.handleError)  // Catches errors and provides an error handler
      );
  }

  private post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${url}`, body)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    // Log the error or perform custom error handling
    console.error('An error occurred:', error);
    throw error; // Rethrow the error or return a default observable
  }

  getEmployee(): Observable<Employee[]> {
    return this.get<Employee[]>("getEmployee");
  }

  getInfo(): Observable<JSON> {
    return this.get<JSON>("getInfo");
  }

  insertEmployee(emp: Employee): Observable<Employee> {
    return this.post<Employee>("saveEmployee", emp);
  }

  getTables(): Observable<string[]> {
    return this.get<string[]>("tables");
  }

  getColumns(tableName: string): Observable<string[]> {
    const params = new HttpParams().set('tableName', tableName);
    return this.get<string[]>("columns", params);
  }

  save(rule: Rules): Observable<number> {
    return this.post<number>("rules", rule);
  }
  fetchRuleDetails(ruleId: number): Observable<Rules> {
    return this.get<Rules>("rules/"+ruleId);
  }

  fetchRules(): Observable<Rule[]> {
    return this.get<Rule[]>("rules");
  }

  fetchTasks():Observable<Task[]> {
    return this.get<Task[]>("tasks");
  }
  fetchTaskDetails(taskId: number): Observable<TaskDetail> {
    return this.get<TaskDetail>("tasks/"+taskId);
  }
  updateTask(taskDetail: TaskDetail): Observable<number> {
    return this.post<number>("tasks", taskDetail);
  }
}
