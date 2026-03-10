import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { generateDummyEmployees } from '../../models/mock-data';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeesData: Employee[] = generateDummyEmployees();
  private employeesSubject = new BehaviorSubject<Employee[]>(this.employeesData);

  public listState = {
    pageIndex: 0,
    pageSize: 10,
    searchName: '',
    searchGroup: '',
    searchStatus: ''
  };

  constructor() { }

  /**
   * Returns an observable that emits the current list of employees.
   * Consumers can subscribe to receive updates when the data changes.
   *
   * @returns {Observable<Employee[]>} An observable containing an array of `Employee` objects.
   */
  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  /**
   * Finds and returns a single employee based on the `id`.
   *
   * @param {string} id - The identifier of the employee to search for.
   * @returns {Employee | undefined} The `Employee` object if found, or `undefined` if not.
   */
  getEmployeeById(id: string): Employee | undefined {
    return this.employeesData.find(emp => emp.id === id);
  }

  /**
   * Removes an employee from the in-memory data and emits the updated list.
   *
   * @param {string} id - The identifier of the employee to be deleted.
   * @returns {void}
   */
  deleteEmployee(id: string): void {
    this.employeesData = this.employeesData.filter(emp => emp.id !== id);
    this.employeesSubject.next([...this.employeesData]);
  }

  /**
   * Adds a new employee to the beginning of the in-memory list and emits the update.
   *
   * @param {Employee} employee - The new employee object. If `id` is not set,
   * the method will assign a simple `id` based on the current array length.
   * @returns {void}
   * Usage: Adds a new employee entry to be displayed in the list and
   * notifies subscribers of the data change.
   */
  addEmployee(employee: Employee): void {
    employee.id = (this.employeesData.length + 1).toString();

    this.employeesData.unshift(employee);
    this.employeesSubject.next([...this.employeesData]);
  }

  /**
   * Updates an existing employee's data if the `id` matches, then emits the updated list.
   *
   * @param {Employee} updatedEmployee - The `Employee` object containing an existing `id` and updated data.
   * @returns {void}
   * Usage: Replaces the corresponding employee entry and synchronizes changes to all subscribers.
   */
  updateEmployee(updatedEmployee: Employee): void {
    const index = this.employeesData.findIndex(emp => emp.id === updatedEmployee.id);
    if (index !== -1) {
      this.employeesData[index] = updatedEmployee;
      this.employeesSubject.next([...this.employeesData]);
    }
  }
}
