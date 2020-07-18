import express from 'express';
import ProductController from './app/controller/ProductController';

const Router = express.Router();

Router.route('/products')
  .post(ProductController.store)
  .get(ProductController.index);

Router.route('/products/:barcode').get(ProductController.show);

export default Router;
