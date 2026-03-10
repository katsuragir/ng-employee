import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { EmployeeList } from './pages/employee-list/employee-list';
import { AddEmployee } from './pages/add-employee/add-employee';
import { EmployeeDetail } from './pages/employee-detail/employee-detail';
import { MainLayout } from './layout/main-layout/main-layout';
import { EditEmployee } from './pages/edit-employee/edit-employee';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'employee-list', component: EmployeeList },
      { path: 'add-employee', component: AddEmployee },
      { path: 'employee-detail/:id', component: EmployeeDetail },
      { path: 'edit-employee/:id', component: EditEmployee }
    ]
  },
  { path: '**', redirectTo: 'login' } // Fallback route
];
