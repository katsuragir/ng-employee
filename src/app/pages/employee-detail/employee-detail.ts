import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee/employee';
import { Employee } from '../../models/employee.model';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ID, SNACKBAR, SNACKBAR_MESSAGE } from '../../common/constanta/generic';
import { CURRENCY } from '../../common/constanta/currency';
import { PATH } from '../../common/constanta/path';

@Component({
  selector: 'app-employee-detail',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDividerModule, MatSnackBarModule],
  providers: [DatePipe],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css',
})
export class EmployeeDetail implements OnInit {
  employee: Employee | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get(ID);
    if (id) {
      this.employee = this.employeeService.getEmployeeById(id);
    }

    if (!this.employee) {
      this.goBack();
    }
  }

  /**
   * Formats a numeric value into the local Rupiah currency format.
   *
   * @param {number} amount - The numeric value to be formatted.
   * @returns {string} The formatted Rupiah currency string (e.g., "Rp. 1.000,00").
   */
  formatRupiah(amount: number): string {
    return new Intl.NumberFormat(CURRENCY.FORMAT, {
      style: 'currency',
      currency: CURRENCY.IDR,
      minimumFractionDigits: 2
    }).format(amount).replace(CURRENCY.RP_GENERIC, CURRENCY.RP_FORMAT);
  }

  /**
   * Navigates back to the employee list.
   *
   * @description No input parameters.
   * @description Navigates to the `/employee-list` route.
   */
  goBack(): void {
    this.router.navigate([PATH.EMPLOYEE_LIST]);
  }

  /**
  * Navigates to the edit page for the current employee, if available.
  *
  * @description The `employee` property must be populated.
  * @description Navigates to the `/edit-employee/:id` route.
  */
  goToEdit(): void {
    if (this.employee) {
      this.router.navigate([PATH.EDIT_EMPLOYEE, this.employee.id]);
    }
  }

  /**
   * Deletes the currently displayed employee after user confirmation.
   *
   * @description Requires the `employee` property and user confirmation via a `confirm` dialog.
   * @description Calls `EmployeeService.deleteEmployee()`, displays a snackbar, and navigates back.
   */
  deleteUser(): void {
    if (this.employee && confirm(`Are you sure you want to delete ${this.employee.firstName}?`)) {
      this.employeeService.deleteEmployee(this.employee.id);

      this.snackBar.open(SNACKBAR_MESSAGE.EMPLOYEE_DELETED, SNACKBAR.CLOSE, {
        duration: SNACKBAR.DURATION,
        panelClass: SNACKBAR.PANEL_CLASS_ERROR
      });

      this.router.navigate([PATH.EMPLOYEE_LIST]);
    }
  }
}
