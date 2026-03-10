import { Employee } from './employee.model';

const firstNames = ['Budi', 'Siti', 'Andi', 'Dewi', 'Agus', 'Ayu', 'Joko', 'Rina', 'Rizky', 'Putri', 'Hendra', 'Maya', 'Reza', 'Dian', 'Fajar', 'Sari', 'Irwan', 'Lita', 'Surya', 'Nita'];
const lastNames = ['Pratama', 'Saputra', 'Wijaya', 'Lestari', 'Hidayat', 'Setiawan', 'Kurniawan', 'Ramadhani', 'Indah', 'Wibowo', 'Santoso', 'Gunawan', 'Nugroho', 'Kusuma', 'Pangestu', 'Firmansyah', 'Putra', 'Maulana', 'Siregar', 'Sinaga'];

export const groups = ['IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Operations', 'Legal', 'Support', 'R&D', 'Management'];
export const statuses = ['Active', 'Inactive', 'Probation'];

export const generateDummyEmployees = (): Employee[] => {
  const employees: Employee[] = [];

  for (let i = 0; i < 100; i++) {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[(i * 3) % lastNames.length];

    const username = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i + 1}`;
    const email = `${username}@example.com`;

    employees.push({
      id: (i + 1).toString(),
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      birthDate: new Date(1980 + (i % 20), i % 12, (i % 28) + 1),
      basicSalary: 5000000 + ((i % 100) * 100000),
      status: statuses[i % statuses.length],
      group: groups[i % groups.length],
      description: new Date()
    });
  }

  return employees;
};