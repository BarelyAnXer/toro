import express from 'express';
import * as ProductController from '../controllers/productController.js';

export const productRoutes = express.Router();

productRoutes.get('/', ProductController.readAllProduct);
productRoutes.post('/', ProductController.createOneProduct);
productRoutes.get('/:id', ProductController.readOneProduct);
productRoutes.put('/:id', ProductController.updateOneProduct);
productRoutes.delete('/:id', ProductController.deleteOneProduct);


