import { Request, Response } from 'express';
import connection from '../../database/connection';

export default {
  store: async (request: Request, response: Response) => {
    const { name, price, amount, barcode } = request.body;
    try {
      const result = await connection('product').insert({
        name,
        price,
        amount,
        barcode,
      });

      const id = result[0];
      const product = await connection('product')
        .select('*')
        .where({ id })
        .first();

      return response.status(201).json(product);
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        error: 'Erro interno no servidor.',
      });
    }
  },
  index: async (request: Request, response: Response) => {
    try {
      const products = await connection('product').select('*');

      return response.status(200).json(products);
    } catch (error) {
      return response.status(500).json({
        error: 'Erro interno no servidor',
      });
    }
  },
  show: async (request: Request, response: Response) => {
    const { barcode } = request.params;
    try {
      const product = await connection('product')
        .select('*')
        .where({ barcode })
        .first();

      return response.status(200).json(product);
    } catch (error) {
      return response.status(500).json({
        error: 'Erro interno no servidor',
      });
    }
  },
};
