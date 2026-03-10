import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee/employee';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BASIC_SALARY_PATTERN, ID, SNACKBAR, SNACKBAR_MESSAGE } from '../../common/constanta/generic';
import { groups, statuses } from '../../models/mock-data';
import { PATH } from '../../common/constanta/path';

@Component({
  selector: 'app-edit-employee',
  imports: [
    CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule,
    MatAutocompleteModule, MatSnackBarModule
  ],
  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.css',
})
export class EditEmployee implements OnInit {
  employeeForm!: FormGroup;
  employeeId!: string;
  maxDate: Date = new Date();

  groups: string[] = groups;
  filteredGroups: string[] = [];
  statuses: string[] = statuses;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      id: [''],
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

    this.employeeId = this.route.snapshot.paramMap.get(ID) || '';
    if (this.employeeId) {
      const employeeData = this.employeeService.getEmployeeById(this.employeeId);
      if (employeeData) {
        this.employeeForm.patchValue(employeeData);
      } else {
        this.router.navigate([PATH.EMPLOYEE_LIST]);
      }
    }
  }

  /**
   * Filters the list of groups based on user input.
   *
   * @param {Event} event - Input event from the group search text element.
   * @returns {void}
   * Usage: Updates `filteredGroups` for autocomplete options.
   */
  filterGroup(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredGroups = this.groups.filter(group => group.toLowerCase().includes(searchTerm));
  }

  /**
   * Handles the form submission to update employee data.
   *
   * @description Uses values from `employeeForm`.
   * @description Calls `EmployeeService.updateEmployee()` if the form is valid,
   * displays a confirmation snackbar, and navigates to the employee list.
   */
  onSubmit() {
    if (this.employeeForm.valid) {
      this.employeeService.updateEmployee(this.employeeForm.value);
      this.snackBar.open(SNACKBAR_MESSAGE.EMPLOYEE_UPDATED, SNACKBAR.CLOSE, {
        duration: SNACKBAR.DURATION,
        panelClass: SNACKBAR.PANEL_CLASS_SUCCESS
      });
      this.router.navigate([PATH.EMPLOYEE_LIST]);
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  /**
  * Cancels the edit process and returns to the employee list.
  *
  * @description No input parameters.
  * @description Navigates to `/employee-list`.
  */
  onCancel() {
    this.router.navigate([PATH.EMPLOYEE_LIST]);
  }
}
