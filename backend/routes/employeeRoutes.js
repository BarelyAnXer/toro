import express from 'express';
import * as EmployeeController from '../controllers/employeeController.js';

export const employeeRoutes = express.Router();

employeeRoutes.post('/', EmployeeController.saveEmployee);
employeeRoutes.get('/:id', EmployeeController.getEmployeeByID);
employeeRoutes.get('/', EmployeeController.listEmployees);
employeeRoutes.delete('/:id', EmployeeController.deleteEmployeeByID);
employeeRoutes.put('/:id', EmployeeController.updateEmployeeByID);

employeeRoutes.post('/:id/salary', EmployeeController.calculatePayrollByStartAndEndDate);
employeeRoutes.post('/:id/timein', EmployeeController.userTimeInWithDateAndTime);
employeeRoutes.post('/:id/timeout', EmployeeController.userTimeOutWithDateAndTime);
employeeRoutes.post('/:id/leave', EmployeeController.markEmployeeLeave);




