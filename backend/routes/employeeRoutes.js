import express from 'express';
import * as EmployeeController from '../controllers/employeeController.js';
import { deleteAccountByID, updateAccountByID } from '../controllers/employeeController.js';

export const employeeRoutes = express.Router();

employeeRoutes.post('/', EmployeeController.createAccount);
employeeRoutes.delete('/:id', EmployeeController.deleteAccountByID);
employeeRoutes.get('/:id', EmployeeController.getAccountByID);
employeeRoutes.get('/', EmployeeController.listAccount);
employeeRoutes.put('/:id', EmployeeController.updateAccountByID);


