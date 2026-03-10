# Angular Employee Management

This project is an employee data management application built with **Angular 21**. It emphasizes **SOLID principles**, **Clean Code**, and a modular architecture to minimize bugs and enhance scalability.

---

## 🚀 Environment Setup

Follow the steps below to run the project on your local machine:

### 1. Install Node.js
This project is recommended to run on **Node.js v20.x or newer** (LTS is recommended).
- [Download Node.js](https://nodejs.org/)

### 2. Install Angular CLI
Use the Angular CLI version that matches this project (v21.2.1):
```bash
npm install -g @angular/cli@21.2.1
```

### 3. Clone & Install Dependencies
```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd ng-employee

# Install the required packages
npm install
```

### 4. Running the Application
Once the installation is complete, start the development server:
```bash
npm start
# or
ng serve
```
Open your browser and navigate to [http://localhost:4200/](http://localhost:4200/).

---

## 📁 Project Structure

The application follows an organized folder structure to ensure Separation of Concerns:

```text
src/app/
├── common/             # Global resources
│   ├── constanta/      # Constant definitions (Paths, Generic strings)
│   └── directive/      # Custom Directives (e.g., ThousandSeparator)
├── layout/             # Main layout components (Header, Sidebar, etc.)
├── models/             # Data model interfaces and Mock Data
├── pages/              # Page components (Add, Edit, List, Detail, Login)
├── services/           # Business logic and API integration (Auth, Employee)
├── app.config.ts       # Application configuration (Routes, Providers)
└── app.ts              # Root component (Standalone)
```

### Core Folder Descriptions:
- **`common/`**: Contains helper functions, constants, and directives used across the application. Helps keep the code DRY (*Don't Repeat Yourself*).
- **`pages/`**: Each feature has its own folder containing the UI logic (HTML/CSS/TS).
- **`services/`**: All data manipulation logic resides here (Single Responsibility), facilitating easier testing and maintenance.
- **`models/`**: Consistent data type definitions to ensure type-safety throughout the application.

---

## 🛠️ Features & Technical Implementation

- **SOLID Principles**: Every component and service is designed with a single responsibility.
- **Thousand Separator Directive**: Numeric input for salary automatically includes thousand separators for display, while maintaining pure numeric data for the backend/service.
- **Reactive Forms**: Robust form validation to ensure data integrity.
- **Modern Styling**: Utilizes **TailwindCSS** and **Angular Material** for a clean, responsive interface.
- **Unit Testing**: Powered by **Vitest** to ensure every module functions as intended.

---

## 🧪 Testing

To execute unit tests:
```bash
npm test
```

---

## 🏗️ Building

To build the application for production:
```bash
npm run build
```
The build artifacts will be stored in the `dist/` directory.

---

**Developed with ❤️ and Clean Code Standards.**
