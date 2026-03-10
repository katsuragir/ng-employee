import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee/employee';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { groups, statuses } from '../../models/mock-data';
import { BASIC_SALARY_PATTERN, SNACKBAR, SNACKBAR_MESSAGE } from '../../common/constanta/generic';
import { PATH } from '../../common/constanta/path';

import { ThousandSeparatorDirective } from '../../common/directive/thousand-separator';

@Component({
  selector: 'app-add-employee',
  imports: [
    CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule,
    MatAutocompleteModule, MatSnackBarModule, ThousandSeparatorDirective
  ],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})
export class AddEmployee implements OnInit {
  employeeForm!: FormGroup;
  maxDate: Date;

  groups: string[] = groups;
  filteredGroups: string[] = [];
  statuses: string[] = statuses;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      basicSalary: ['', [Validators.required, Validators.pattern(BASIC_SALARY_PATTERN)]],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.filteredGroups = this.groups;
  }
  /**
   * Filters the list of groups based on user input.
   *
   * @param {Event} event - Input event from the group search text element.
   * @returns {void}
   * Usage: Updates `filteredGroups` to display matching options.
   */
  filterGroup(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredGroups = this.groups.filter(group => group.toLowerCase().includes(searchTerm));
  }
  /**
   * Handles the form submission for creating a new employee.
   *
   * @description Uses values from `employeeForm`.
   * @description Calls `EmployeeService.addEmployee()`, displays a snackbar, and navigates to the employee list.
   * Usage: Saves new employee data if the form is valid; marks all controls if invalid.
   */
  onSubmit() {
    if (this.employeeForm.valid) {
      this.employeeService.addEmployee(this.employeeForm.value);
      this.snackBar.open(SNACKBAR_MESSAGE.EMPLOYEE_ADDED, SNACKBAR.CLOSE, {
        duration: SNACKBAR.DURATION,
        panelClass: SNACKBAR.PANEL_CLASS_SUCCESS
      });
      this.router.navigate([PATH.EMPLOYEE_LIST]);
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }
  /**
   * Cancels the employee addition process and returns to the employee list.
   *
   * @description No input parameters.
   * @description Navigates to the `/employee-list` route.
   */
  onCancel() {
    this.router.navigate([PATH.EMPLOYEE_LIST]);
  }
}
