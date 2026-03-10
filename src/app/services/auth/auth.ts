import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PATH } from '../../common/constanta/path';

const USERNAME = 'admin';
const PASSWORD = 'admin123';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private isAuthenticated = false;

  constructor(private router: Router) { }

  /**
   * The login function is used to authenticate a user based on their username and password.
   * If the credentials are correct, the user will be considered authenticated and redirected to the employee list page.
   * 
   * @param username - The entered username (string)
   * @param password - The entered password (string)
   * @returns boolean - Returns true if the login is successful, false otherwise
   */
  login(username: string, password: string): boolean {
    if (username === USERNAME && password === PASSWORD) {
      this.isAuthenticated = true;
      this.router.navigate([PATH.EMPLOYEE_LIST]);
      return true;
    }
    return false;
  }

  /**
   * The isLoggedIn function is used to check the current authentication status of the user.
   * 
   * @returns boolean - Returns true if the user is currently logged in, false otherwise
   */
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  /**
   * The logout function is used to terminate the user's authentication session.
   * The authentication status will be set to false and the user will be redirected to the login page.
   * 
   * @returns void - No return value
   */
  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate([PATH.LOGIN]);
  }
}
