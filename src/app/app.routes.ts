import { Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoginFormsComponent } from './login-forms/login-forms.component';
import { KieServerComponent } from './kie-server/kie-server.component';
import { RuleBuilderComponent } from './rule-builder/rule-builder.component';

export const routes: Routes = [
    {
        path: 'home',component:HomeComponentComponent
    },
    {
        path: 'forms',component:EmployeeComponent
    },
    {
        path: 'loginForm',component:LoginFormsComponent
    },
    {
        path: 'kieServer',component:KieServerComponent
    },
    {
        path: 'ruleBuilder',component:RuleBuilderComponent
    }
];
