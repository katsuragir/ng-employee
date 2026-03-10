import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee/employee';
import { Employee } from '../../models/employee.model';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { groups, statuses } from '../../models/mock-data';
import { PATH } from '../../common/constanta/path';
import { SNACKBAR } from '../../common/constanta/generic';

@Component({
  selector: 'app-employee-list',
  imports: [
    CommonModule, FormsModule, MatTableModule, MatPaginatorModule,
    MatSortModule, MatInputModule, MatSelectModule, MatButtonModule,
    MatIconModule, MatSnackBarModule
  ],
  providers: [CurrencyPipe, DatePipe],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['firstName', 'username', 'group', 'basicSalary', 'action'];
  dataSource = new MatTableDataSource<Employee>([]);

  // Filter Models
  searchName: string = '';
  searchGroup: string = '';
  searchStatus: string = '';

  // Dropdown list for filtering
  groups: string[] = groups;
  statuses: string[] = statuses;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.searchName = this.employeeService.listState.searchName;
    this.searchGroup = this.employeeService.listState.searchGroup;
    this.searchStatus = this.employeeService.listState.searchStatus;

    this.dataSource.filterPredicate = (data: Employee, filter: string) => {
      const searchTerms = JSON.parse(filter);
      const matchName = data.firstName.toLowerCase().includes(searchTerms.name) ||
        data.lastName.toLowerCase().includes(searchTerms.name);
      const matchGroup = searchTerms.group ? data.group === searchTerms.group : true;
      const matchStatus = searchTerms.status ? data.status === searchTerms.status : true;

      return matchName && matchGroup && matchStatus;
    };

    this.employeeService.getEmployees().subscribe(data => {
      this.dataSource.data = data;
      this.applyFilter();
    });
  }

  ngAfterViewInit() {
    // Restore paginator and sort state
    if (this.paginator) {
      this.paginator.pageIndex = this.employeeService.listState.pageIndex;
      this.paginator.pageSize = this.employeeService.listState.pageSize;
    }

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter() {
    const filterValue = JSON.stringify({
      name: this.searchName.trim().toLowerCase(),
      group: this.searchGroup,
      status: this.searchStatus
    });
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.saveState();
  }

  /**
   * Saves the list state (pagination and filters) to the service.
   *
   * @description Uses `paginator`, `searchName`, `searchGroup`, and `searchStatus` properties from the component.
   * @description Updates `employeeService.listState` so the list can be restored.
   */
  saveState() {
    if (this.paginator) {
      this.employeeService.listState.pageIndex = this.paginator.pageIndex;
      this.employeeService.listState.pageSize = this.paginator.pageSize;
    }
    this.employeeService.listState.searchName = this.searchName;
    this.employeeService.listState.searchGroup = this.searchGroup;
    this.employeeService.listState.searchStatus = this.searchStatus;
  }

  /**
   * Navigates to the add employee page.
   *
   * @description No input parameters.
   * @description Navigates to the `/add-employee` route.
   */
  navigateToAdd() {
    this.router.navigate([PATH.ADD_EMPLOYEE]);
  }

  /**
   * Saves the current state and navigates to the employee detail page.
   *
   * @param {string} id - The identifier of the employee to view details for.
   * @returns {void}
   */
  viewDetail(id: string) {
    this.saveState();
    this.router.navigate([PATH.EMPLOYEE_DETAIL, id]);
  }
  /**
   * Handles the edit action for an employee row.
   *
   * @param {Employee} employee - The employee object to be edited.
   * @param {Event} event - Click event to prevent propagation to the row click.
   * @returns {void}
   * Usage: Demo/placeholder for the edit action; currently displays a snackbar.
   */
  editEmployee(employee: Employee, event: Event) {
    event.stopPropagation();
    this.snackBar.open(`Change data for ${employee.firstName}`, SNACKBAR.CLOSE, {
      duration: SNACKBAR.DURATION,
      panelClass: ['snackbar-warning']
    });
  }

  /**
   * Deletes an employee after stopping the click event propagation on the row.
   *
   * @param {string} id - The identifier of the employee to be deleted.
   * @param {string} name - The employee name used in the snackbar message.
   * @param {Event} event - Click event to prevent propagation to the row click.
   * @returns {void}
   */
  deleteEmployee(id: string, name: string, event: Event) {
    event.stopPropagation();
    this.employeeService.deleteEmployee(id);
    this.snackBar.open(`Employee ${name} has been deleted!`, SNACKBAR.CLOSE, {
      duration: SNACKBAR.DURATION,
      panelClass: ['snackbar-error']
    });
  }
}
