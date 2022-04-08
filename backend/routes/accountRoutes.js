import express from 'express';
import * as EmployeeController from '../controllers/accountController.js';

export const accountRoutes = express.Router();

accountRoutes.post('/', EmployeeController.createAccount);
accountRoutes.delete('/:id', EmployeeController.deleteAccountByID);
accountRoutes.get('/:id', EmployeeController.getAccountByID);
accountRoutes.get('/', EmployeeController.listAccount);
accountRoutes.put('/:id', EmployeeController.updateAccountByID);


