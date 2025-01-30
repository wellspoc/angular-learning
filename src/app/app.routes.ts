import { Routes } from '@angular/router';
import { RuleBuilderComponent } from './rule-builder/rule-builder.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskComponent } from './task/task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ResultComponent } from './result/result.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'ruleBuilder', component: RuleBuilderComponent },
  { path: 'ruleBuilder/:id', component: RuleBuilderComponent },
  { path: 'task/:id', component: TaskComponent },
  { path: 'taskList', component: TaskListComponent },
  { path: 'result', component: ResultComponent }
];
